-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gamelog_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gamelog" (
    "id" TEXT NOT NULL,
    "thema_id" TEXT NOT NULL,

    CONSTRAINT "Gamelog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Thema" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Thema_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_gamelog_id_fkey" FOREIGN KEY ("gamelog_id") REFERENCES "Gamelog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gamelog" ADD CONSTRAINT "Gamelog_thema_id_fkey" FOREIGN KEY ("thema_id") REFERENCES "Thema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
