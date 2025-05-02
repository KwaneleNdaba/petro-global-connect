
interface Station {
    id: number;
    name: string;
    logo: string;
    slogan: string;
    location: string;
    fuelStock: string;
    sales: string;
    status: 'Active' | 'Low Stock' | 'Closed';
}
export const stations: Station[] = [
    {
        id: 1,
        name: "Engen Midrand",
        logo: "/engen-logo.png",
        slogan: "With us you are Number One",
        location: "Midrand, GP",
        fuelStock: "12,500L",
        sales: "R 45,000",
        status: "Active",
    },
    {
        id: 2,
        name: "Sasol Germiston",
        logo: "/sasol-logo.png",
        slogan: "Innovating for a better world",
        location: "Germiston, GP",
        fuelStock: "8,200L",
        sales: "R 30,200",
        status: "Low Stock",
    },
    {
        id: 3,
        name: "Total Bedfordview",
        logo: "/total-logo.png",
        slogan: "Committed to Better Energy",
        location: "Johannesburg, GP",
        fuelStock: "15,300L",
        sales: "R 52,700",
        status: "Active",
    },
    {
        id: 4,
        name: "BP Hatfield",
        logo: "/bp.png",
        slogan: "bp is always here for every journey, everyday!",
        location: "Pretoria, GP",
        fuelStock: "6,400L",
        sales: "R 21,500",
        status: "Closed",
    }
];