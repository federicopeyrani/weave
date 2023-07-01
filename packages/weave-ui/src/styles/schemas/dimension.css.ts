import { createVar } from "@vanilla-extract/css";
import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { mapValues } from "lodash";

import breakpoints from "@/styles/conditions/breakpoints.css";
import { core } from "@/tokens/core/index.css";
import { SprinkleProps } from "@/utils/Types";

export const dimension = createVar();

export const dimensionOptions = {
  0: "0",
  1: core.grid.regular1,
  2: core.grid.regular2,
} as const;

const dimensionValues = mapValues(dimensionOptions, (value) => ({
  vars: { [dimension]: value },
}));

const properties = defineProperties({
  ...breakpoints,
  properties: {
    dimension: dimensionValues,
  },
});

const sprinkles = createSprinkles(properties);

export type DimensionProperties = SprinkleProps<typeof sprinkles>;

export type DimensionValues = DimensionProperties["dimension"];

export default sprinkles;
