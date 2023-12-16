import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const cartsSchema = new Schema({
  products: {
    type: [
      {
        id_prod: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    default: function () {
      return [];
    },
  },
});

cartsSchema.plugin(paginate);

cartsSchema.pre("findOne", function () {
  this.populate("products.id_prod");
}); // con esta funcion automatizamos la busqueda por populate para no tener que declararlo sobre la busqueda como tal.

export const cartsModel = model("carts", cartsSchema);
