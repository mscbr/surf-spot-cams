import { useState } from "react";

import { countries } from "../constants";

interface Params {
  search?: string;
}

export function useCountryCode({ search }: Params) {
  const isValidSearch =
    search && search.length > 0 && !!countries.find(c => c.name === search);
  return [
    search
      ? countries.filter(country =>
          country.name.toLowerCase().includes(search.toLowerCase())
        )
      : [],
    isValidSearch
  ];
}
