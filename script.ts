import { prisma } from './prisma/client'

async function main() {
   // TODO: write custom queries
    const count: number = await prisma.dailyTemperature.count();
    console.log(`All measured days = ${count}`);
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