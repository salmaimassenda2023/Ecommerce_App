import { type SchemaTypeDefinition } from 'sanity'
import product from "@/sanity/schemaTypes/product";
import banner from "@/sanity/schemaTypes/banner";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,banner],
}
