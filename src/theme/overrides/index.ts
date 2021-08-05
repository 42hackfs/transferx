import { merge } from "lodash";
import { Theme } from "@material-ui/core/styles";
import Card from "./Card";

import Button from "./Button";

import LoadingButton from "./LoadingButton";

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: Theme) {
  return merge(Card(theme), Button(theme), LoadingButton(theme));
}
