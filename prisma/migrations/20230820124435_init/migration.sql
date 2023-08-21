-- CreateTable
CREATE TABLE "LocationImage" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "pathId" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Path" (
    "id" TEXT NOT NULL,
    "cordinates" JSONB NOT NULL,
    "startLocation" JSONB NOT NULL,
    "endLocation" JSONB NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Path_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LocationImage_lng_lat_key" ON "LocationImage"("lng", "lat");

-- AddForeignKey
ALTER TABLE "LocationImage" ADD CONSTRAINT "LocationImage_pathId_fkey" FOREIGN KEY ("pathId") REFERENCES "Path"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Path" ADD CONSTRAINT "Path_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
