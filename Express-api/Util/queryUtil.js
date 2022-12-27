class customQuery {
  constructor(query) {
    this.query = query;
  }

  splitQuery() {
    this.query = this.query?.contains(",") && this.query?.split(",")?.join(" ");
    return this;
  }

  filterQuery(...items) {
    let customQuery;
    if (!this.query) return this;
    customQuery = this.query.split(",");
    this.query = customQuery
      .map((el) => {
        if (!items.includes(el)) return el;
      })
      .join(" ");
    return this;
  }
}

module.exports = customQuery;
