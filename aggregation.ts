import {prisma} from './prisma/client'

declare global {
    interface BigInt {
        toJSON(): Number;
    }
}
BigInt.prototype.toJSON = function () {
    return Number(this)
}

interface DailyTemperatureExtended {
    month: number,
    year: number,
    minTemp: bigint,
    maxTemp: bigint,
    avgTemp: bigint,
}


async function main() {
    const avg = await prisma.dailyTemperature.aggregate({
        _avg: {
            morningTemperature: true,
            afternoonTemperature: true,
            eveningTemperature: true,
            nightTemperature: true
        }
    });
    console.log(`Avg afternoonTemperature = ${JSON.stringify(avg)}`);


    // const projectByMonthsAndYears = await prisma.$queryRawUnsafe();
    const projectByMonthsAndYears = await prisma.$queryRaw<DailyTemperatureExtended[]>`
        SELECT MONTH(date) AS month,
               YEAR(date)  AS year,
               LEAST(
                       morningTemperature,
                       afternoonTemperature,
                       eveningTemperature,
                       nightTemperature
               ) AS minTemp,
               GREATEST(
                       morningTemperature,
                       afternoonTemperature,
                       eveningTemperature,
                       nightTemperature
               ) AS maxTemp,
               (
                   morningTemperature +
                   afternoonTemperature +
                   eveningTemperature +
                   nightTemperature
               ) / 4.0 AS avgTemp
        FROM DailyTemperature
        ORDER BY date DESC
        LIMIT 10
    `;
    console.log(`Avg projectByMonthsAndYears = ${JSON.stringify(projectByMonthsAndYears, null, 2)}`);
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