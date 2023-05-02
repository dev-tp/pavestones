import { Pavestone } from '@prisma/client';
import React from 'react';

type CertificateProps = {
  className?: string;
  data: Pavestone;
};

function getImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onerror = (error) => reject(error);
    image.onload = () => resolve(image);

    image.src = url;
  });
}

function StaticMap({ className, data }: CertificateProps): JSX.Element {
  const ref = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    (async function load() {
      const canvas = ref.current;

      if (!canvas) {
        return;
      }

      canvas.width *= 1.5;
      canvas.height *= 1.5;

      const context = canvas.getContext('2d');

      if (!context) {
        return;
      }

      const background = await getImage('/images/cert-floor-plan.png');
      const reference = await getImage('/images/mini-floor-plan.png');

      const referenceWidth = reference.naturalWidth / 1.5;
      const referenceHeight = reference.naturalHeight / 1.5;

      const radius = 4;

      context.drawImage(
        background,
        -data.x - radius + canvas.width / 2,
        -data.y - radius + canvas.height / 2
      );

      context.drawImage(reference, 0, 0, referenceWidth, referenceHeight);

      context.beginPath();
      context.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
      context.fillStyle = 'red';
      context.fill();

      context.rect(
        (data.x / background.naturalWidth) * referenceWidth - 10,
        (data.y / background.naturalHeight) * referenceHeight - 10,
        20,
        20
      );
      context.strokeStyle = 'red';
      context.stroke();
    })();
  }, [data]);

  return <canvas className={className} ref={ref} />;
}

export default function Certificate({ data }: CertificateProps): JSX.Element {
  return (
    <div className="h-screen">
      <img alt="logo" className="absolute h-[1in]" src="/images/logo.png" />
      <div className="flex h-[1in] items-center justify-center">
        <div className="text-center">
          <p>Cathedral Pavestone designated for:</p>
          <p>{data.dedicated_to}</p>
        </div>
      </div>
      <StaticMap className="my-4 h-1/2 w-full" data={data} />
      <div className="grid grid-cols-2 gap-8">
        <div>
          <p className="mb-4">
            Thank you for your gift to the Cathedral of Our Lady of the Angels.
            Your designated paving stone is an enduring symbol of faith and
            devotion. We sincerely appreciate your generosity and invite you to
            use this map of the Cathedral floor plan to locate your stone.
          </p>
          <p>
            Your stone is indicated by the red dot in the &quot;Enlarged
            Area.&quot; The image labeled &quot;Overall Plan&quot; shows the
            entire floor plan and the red rectangle indicated the area being
            enlarged.
          </p>
        </div>
        <ul className="list-[upper-latin] columns-2">
          <li>Grand Doors</li>
          <li>South Ambulatory</li>
          <li>Baptismal Font</li>
          <li>Main Aisle</li>
          <li>Altar</li>
          <li>Organ Chancel</li>
          <li>North Doors</li>
          <li>North Ambulatory</li>
        </ul>
      </div>
    </div>
  );
}
