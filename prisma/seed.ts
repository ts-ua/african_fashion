const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    try {
        // Create the notify_new_order function
        await prisma.$executeRawUnsafe(`
            CREATE OR REPLACE FUNCTION notify_new_order()
            RETURNS trigger AS $$
            BEGIN
                PERFORM pg_notify('new_order', row_to_json(NEW)::text);
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);

        await prisma.$executeRawUnsafe(`
            CREATE TRIGGER new_order_trigger
            AFTER INSERT ON order
            FOR EACH ROW
            EXECUTE FUNCTION notify_new_order();
        `);

        console.log('Database has been seeded, and the trigger has been created!');
    } catch (error) {
        console.error('Error creating trigger:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
