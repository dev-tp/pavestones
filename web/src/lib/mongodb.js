export async function connection() {
  function Database() {
    this.collection = (collection) => this;
    this.database = () => this;
    this.deleteOne = () => this;
    this.find = (filters) => this;
    this.limit = () => this;
    this.sort = () => this;
    this.toArray = () => [];
    this.updateOne = () => this;
  }

  return {
    client: {},
    database: new Database(),
  };
}
