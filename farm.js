const getYieldForPlant = function (inputPlant, enviromentFactors) {
    let yieldModifier = 1;

    for (const enviromentFactor in enviromentFactors) { //Iterates over all enviroment factors given through the parameters
        if (enviromentFactor in inputPlant.factor) {    //Checks if the factor being iterated over is in the list of factors relevant to the plant.
            yieldModifier = (100 + inputPlant.factor[enviromentFactor][enviromentFactors[enviromentFactor]]) / 100 * yieldModifier;
            // Applies the value from the plant information of the factor being iterated over to change the modifier.
        }
    }
    
    return inputPlant.yield * yieldModifier;
}

const getYieldForCrop = function (inputCrop, enviromentFactors) {
    return inputCrop.numCrops * getYieldForPlant(inputCrop.crop, enviromentFactors);
}

const getTotalYield = function (allCrops, enviromentFactors) {
    let totalYield = 0;
    
    allCrops.crops.forEach((item) => {
        totalYield += getYieldForCrop(item, enviromentFactors);
    });

    return totalYield;
}

const getCostForCrop = function (inputCrop) {
    return inputCrop.crop.cost * inputCrop.numCrops;
}

const getRevenueForCrop = function (inputCrop, enviromentFactors) {
    return inputCrop.crop.salePrice * getYieldForCrop(inputCrop, enviromentFactors);
}

const getProfitForCrop = function (inputCrop, enviromentFactors) {
    return getRevenueForCrop(inputCrop, enviromentFactors) - getCostForCrop(inputCrop);
}

const getTotalProfit = function (allCrops, enviromentFactors) {
    let totalProfit = 0

    allCrops.crops.forEach((item) => {
        totalProfit += getProfitForCrop(item, enviromentFactors);
    })

    return totalProfit;
}

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
};