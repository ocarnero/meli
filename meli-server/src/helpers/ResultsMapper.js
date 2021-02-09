class ResultsMapper {
  mapResults(data) {
    let result = {
      author: {
        name: "",
        lastname: ""
      },
      categories: data.filters
        .filter((e) => e.id === "category")
        .map((f) => f.values.map((x) => x.path_from_root.map((y) => y.name))),
      items: data.results.slice(0, 4).map((item) => ({
        id: item.id,
        title: item.title,
        price: {
          currency: item.prices.currency_id,
          amount: item.price,
          decimals: 0
        },
        picture: item.thumbnail.replace("http", "https"),
        condition: item.attributes.find((e) => e.id === "ITEM_CONDITION")
          .values[0].name,
        free_shipping: item.shipping.free_shipping
      }))
    };
    return result;
  }

  mapItem(item, descriptions) {
    let result = {
      author: {
        name: "",
        lastname: ""
      },
      item: {
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: item.price,
          decimals: ""
        },
        picture: item.thumbnail
          .replace("-I.jpg", "-O.jpg")
          .replace("http", "https"),
        condition: item.condition,
        free_shipping: "",
        sold_quantity: item.sold_quantity,
        description: descriptions[0].plain_text
      }
    };
    return result;
  }
}

export default new ResultsMapper();
