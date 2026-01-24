import {prisma} from './prisma/client'
import {SortOrder} from "./generated/prisma/internal/prismaNamespace";

async function main() {
    const count: number = await prisma.dailyTemperature.count();
    console.log(`All measured days = ${count}`);

    const result = await prisma.dailyTemperature.findMany({
        select: {date: true, id: false},            // cool thing that result (projection) contains only selected fields and type safety
        where: {afternoonTemperature:  {lt: -10}},
        orderBy: {date: SortOrder.desc}
    });
    console.log(`Coldest days = ${JSON.stringify(result.map(r => r.date?.toLocaleDateString()))}`);
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })