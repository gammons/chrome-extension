const MonthlyDiscount = 0.6
const YearlyDiscount = 0.5

export const onDemandPriceFor = (units, discountPercentage) => {
  return (units * onDemandUnitPriceFor(units) * (1 - discountPercentage / 100)).toFixed(2)
}

export const monthlyPriceFor = (units) => {
  return Math.round(units * monthlyUnitPriceFor(units))
}

export const yearlyPriceFor = (units) => {
  return Math.round(units * yearlyUnitPriceFor(units))
}

export const onDemandUnitPriceFor = (units) => {
  if (units < 5000) {
    return 0.0053 // tier 0
  } else if (units < 10000) {
    return 0.0045 // tier 1
  } else if (units < 15000) {
    return 0.0045 // tier 1
  } else if (units < 25000) {
    return 0.0038 // tier 2
  } else if (units < 50000) {
    return 0.0038
  } else if (units < 100000) {
    return 0.003 // tier 3
  } else if (units < 250000) {
    return 0.0023 // tier 4
  } else if (units < 500000) {
    return 0.0019 // tier 5
  } else if (units < 1000000) {
    return 0.0015 // tier 6
  } else {
    return 0.0014 // tier 7
  }
}

export const monthlyUnitPriceFor = (units) => {
  return onDemandUnitPriceFor(units) * MonthlyDiscount
}

export const yearlyUnitPriceFor = (units) => {
  return onDemandUnitPriceFor(units) * YearlyDiscount
}
