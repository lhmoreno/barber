-- CreateEnum
CREATE TYPE "scheduling_status" AS ENUM ('confirmed', 'canceled');

-- CreateTable
CREATE TABLE "barber_shop" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,

    CONSTRAINT "barber_shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "timeInMinutes" INTEGER NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedulings" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "scheduling_status" NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "schedulings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "schedulings" ADD CONSTRAINT "schedulings_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;
