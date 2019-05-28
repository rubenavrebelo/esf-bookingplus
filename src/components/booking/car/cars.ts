export interface CarSpec {
    name: string;
    seats: number;
    doors: number;
    largeBags: number,
    smallBags?: number
    air: boolean;
    gearbox: string;
    fuelPolicy: string;
    pontuation: number;
    price: number;
}

const Peugeot3008: CarSpec = {
    name: 'Peugeot 3008',
    seats: 5,
    doors: 4,
    largeBags: 3,
    air: true,
    gearbox: 'Manual',
    fuelPolicy: 'Full to full',
    price: 5 + Math.random() * (12 - 5),
    pontuation: 5 + Math.random() * (9 - 5)
}

const VWPolo: CarSpec = {
    name: 'Volkswagen Polo',
    seats: 5,
    doors: 4,
    largeBags: 1,
    smallBags: 1,
    air: true,
    gearbox: 'Manual',
    fuelPolicy: 'Full to Full',
    price: 5 + Math.random() * (8 - 5),
    pontuation: 5 + Math.random() * (9 - 5)
}

const CitroenC4: CarSpec = {
    name: 'Citroen C4 Cactus',
    seats: 5,
    doors: 4,
    largeBags: 2,
    air: true,
    gearbox: 'Manual',
    fuelPolicy: 'Full to Full',
    price: 5 + Math.random() * (10 - 5),
    pontuation: 5 + Math.random() * (9 - 5)
}

export function generateCars() {
    const carArray = [];
    carArray.push({
        ...CitroenC4,
        price: 5 + Math.random() * (10 - 5),
        pontuation: 2 + Math.random() * (8)
    });
    carArray.push({
        ...VWPolo,
        price: 5 + Math.random() * (8 - 5),
        pontuation: 2 + Math.random() * (8)
    });
    carArray.push({
        ...Peugeot3008,
        price: 5 + Math.random() * (12 - 5),
        pontuation: 2 + Math.random() * (8)
    });
    return carArray;
}