const { getYieldForPlant, getYieldForCrop, getTotalYield, getCostForCrop, getRevenueForCrop, getProfitForCrop, getTotalProfit } = require("./farm");

//Starting Tests

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
    };

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});

//End of Starting tests
//___________________________________________________________________

describe("getCostsForCrop", () => {
    test("Calculate the cost for sowing 230 maize plants", () => {
        const maize = {
            name: "maize",
            cost: 1,
        }

        const input = {
            crop: maize,
            numCrops: 230,
        }

        expect(getCostForCrop(input)).toBe(230);
    })
})

describe("getRevenueForCrop", () => {
    test("Calculate the revenue for 5 kilos of apples", () => {
        const apples = {
            name: "apples",
            yield: 1,
            salePrice: 2,
        }

        const input = {
            crop: apples,
            numCrops: 5,
        }

        expect(getRevenueForCrop(input)).toBe(10);
    })
})

describe("getProfitForCrop", () => {
    test("Calculate the profit for 5 kilos of apples", () => {
        const apples = {
            name: "apples",
            yield: 1,
            cost: 1,
            salePrice: 2,
        }

        const input = {
            crop: apples,
            numCrops: 5,
        }

        expect(getProfitForCrop(input)).toBe(5);
    })
})

describe("getTotalProfit", () => {
    test("Calculate the profit for multiple crops", () => {
        const apples = {
            name: "apples",
            yield: 1,
            cost: 1,
            salePrice: 2,
        }

        const maize = {
            name: "maize",
            yield: 5,
            cost: 2,
            salePrice: 3,
        }

        const crops = [
            { crop: apples, numCrops: 5 }, //profit is 5
            { crop: maize, numCrops: 2 },  //profit is 26
        ];

        expect(getTotalProfit({ crops })).toBe(31);
    })

    test("Calculate total profit with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
            cost: 5,
            salePrice: 5,
        };
        
        const crops = [{ crop: corn, numCrops: 0 }];

        expect(getTotalProfit({ crops })).toBe(0);
    })
})

// Tests With environmental factors
//_____________________________________________________________________

describe("getYieldForPlant", () => {
    test("Calculate the yield for a low sun environmental factor, wind should have no effect", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                }
            },
        };
            
        const environmentFactors = {
            sun: "low",
        };

        expect(getYieldForPlant(corn, environmentFactors)).toBe(15);
    })

    test("Calculate the yield for a high sun, high wind environment", () => {
        const avocado = {
            name: "avocado",
            yield: 3,
            factor: {
                sun: {
                    low: -20,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                }
            },
        };
            
        const environmentFactors = {
            sun: "high",
            wind: "high",
        };

        expect(getYieldForPlant(avocado, environmentFactors)).toBeCloseTo(1.8);
    })
})

describe("getYieldForCrop", () => {
    test("Get the total yield for a crop in a low sun environment, wind should have no effect", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                }
            },
        };
            
        const environmentFactors = {
            sun: "low",
        };

        const input = {
            crop: corn,
            numCrops: 10,
        };

        expect(getYieldForCrop(input, environmentFactors)).toBe(150);
    })

    test("Get the total yield for a crop for a high sun environment", () => {
        const avocado = {
            name: "avocado",
            yield: 3,
            factor: {
                sun: {
                    low: -20,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                }
            },
        };
            
        const environmentFactors = {
            sun: "high",
            wind: "high",
        };

        const input = {
            crop: avocado,
            numCrops: 8,
        };

        expect(getYieldForCrop(input, environmentFactors)).toBeCloseTo(14.4);
    })
})

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops in a low sun environment", () => {
        const avocado = {
            name: "avocado",
            yield: 3,
            factor: {
                sun: {
                    low: -20,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                }
            },
        };

        const corn = {
            name: "corn",
            yield: 30,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                }
            },
        };

        const environmentFactors = {
            sun: "low",
        };

        const crops = [
            { crop: avocado, numCrops: 5 },
            { crop: corn, numCrops: 2 },
        ];

        expect(getTotalYield({ crops }, environmentFactors)).toBeCloseTo(42);
    });

    test("Calculate total yield with 0 amount and high wind environment", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                }
            },
        };

        const environmentFactors = {
            wind: "high",
        };

        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});

describe("getRevenueForCrop", () => {
    test("Calculate the revenue for 5 kilos of apples in a low sun, high wind environment", () => {
        const apples = {
            name: "apples",
            yield: 10,
            salePrice: 2,
            factor: {
                sun: {
                    low: -30,
                    medium: 0,
                    high: 30,
                },
                wind: {
                    low: 0,
                    medium: -20,
                    high: -50,
                }
            },
        }
        
        const environmentFactors = {
            sun: "low",
            wind: "high",
        };

        const input = {
            crop: apples,
            numCrops: 5,
        }

        expect(getRevenueForCrop(input, environmentFactors)).toBeCloseTo(35);
    })
})

describe("getProfitForCrop", () => {
    test("Calculate the profit for 5 kilos of apples in a medium sun, medium wind evironment", () => {
        const apples = {
            name: "apples",
            yield: 10,
            cost: 1,
            salePrice: 2,
            factor: {
                sun: {
                    low: -30,
                    medium: 0,
                    high: 30,
                },
                wind: {
                    low: 0,
                    medium: -20,
                    high: -50,
                }
            },
        }

        const input = {
            crop: apples,
            numCrops: 5,
        }

        const environmentFactors = {
            sun: "medium",
            wind: "medium",
        };

        expect(getProfitForCrop(input, environmentFactors)).toBeCloseTo(75);
    })
})

describe("getTotalProfit", () => {
    test("Calculate the profit for multiple crops in a high sun enviroment", () => {
        const apples = {
            name: "apples",
            yield: 10,
            cost: 1,
            salePrice: 2,
            factor: {
                sun: {
                    low: -30,
                    medium: 0,
                    high: 30,
                },
                wind: {
                    low: 0,
                    medium: -20,
                    high: -50,
                }
            },
        }

        const maize = {
            name: "maize",
            yield: 5,
            cost: 2,
            salePrice: 3,
            factor: {
                sun: {
                    low: -40,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -10,
                    high: -30,
                }
            },
        }

        const crops = [
            { crop: apples, numCrops: 5 }, //profit is 125
            { crop: maize, numCrops: 2 },  //profit is 41
        ];

        const environmentFactors = {
            sun: "high",
        };

        expect(getTotalProfit({ crops }, environmentFactors)).toBeCloseTo(166);
    })

    test("Calculate total profit with 0 amount in a high wind environment", () => {
        const corn = {
            name: "corn",
            yield: 3,
            cost: 5,
            salePrice: 5,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -30,
                    high: -60,
                }
            },
        };
        
        const crops = [{ crop: corn, numCrops: 0 }];

        expect(getTotalProfit({ crops })).toBe(0);
    })
})