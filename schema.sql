


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "public";


ALTER SCHEMA "public" OWNER TO "pg_database_owner";


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE TYPE "public"."payment_method_enum" AS ENUM (
    'momo',
    'card',
    'banking'
);


ALTER TYPE "public"."payment_method_enum" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."admins" (
    "user_id" integer NOT NULL,
    "full_name" character varying(255) NOT NULL,
    "email" character varying(255) NOT NULL,
    "password_hash" character varying(255) NOT NULL,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE "public"."admins" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."admins_user_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."admins_user_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."admins_user_id_seq" OWNED BY "public"."admins"."user_id";



CREATE TABLE IF NOT EXISTS "public"."cinemas" (
    "cinema_id" integer NOT NULL,
    "name" character varying(255) NOT NULL,
    "address" character varying(500) NOT NULL,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE "public"."cinemas" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."cinemas_cinema_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."cinemas_cinema_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."cinemas_cinema_id_seq" OWNED BY "public"."cinemas"."cinema_id";



CREATE TABLE IF NOT EXISTS "public"."customers" (
    "customer_id" integer NOT NULL,
    "full_name" character varying(255) NOT NULL,
    "email" character varying(255) NOT NULL,
    "password_hash" character varying(255) NOT NULL,
    "phone_number" character varying(20),
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "CCCD" "text"
);


ALTER TABLE "public"."customers" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."customers_customer_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."customers_customer_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."customers_customer_id_seq" OWNED BY "public"."customers"."customer_id";



CREATE TABLE IF NOT EXISTS "public"."invoice_products" (
    "invoice_id" integer NOT NULL,
    "product_id" integer NOT NULL,
    "quantity" integer NOT NULL
);


ALTER TABLE "public"."invoice_products" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."invoices" (
    "invoice_id" integer NOT NULL,
    "customer_id" integer NOT NULL,
    "total_amount" numeric(10,2) NOT NULL,
    "payment_method" "public"."payment_method_enum" NOT NULL,
    "status" character varying(50) DEFAULT 'pending'::character varying,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE "public"."invoices" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."invoices_invoice_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."invoices_invoice_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."invoices_invoice_id_seq" OWNED BY "public"."invoices"."invoice_id";



CREATE TABLE IF NOT EXISTS "public"."movies" (
    "movie_id" integer NOT NULL,
    "title" character varying(255) NOT NULL,
    "description" "text",
    "duration_min" integer NOT NULL,
    "release_date" "date",
    "rating" character varying(10),
    "poster_url" character varying(500),
    "director" character varying(255),
    "actors" json,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE "public"."movies" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."movies_movie_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."movies_movie_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."movies_movie_id_seq" OWNED BY "public"."movies"."movie_id";



CREATE TABLE IF NOT EXISTS "public"."products" (
    "product_id" integer NOT NULL,
    "name" character varying(255) NOT NULL,
    "description" "text",
    "price" numeric(10,2) NOT NULL,
    "image" character varying(500),
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE "public"."products" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."products_product_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."products_product_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."products_product_id_seq" OWNED BY "public"."products"."product_id";



CREATE TABLE IF NOT EXISTS "public"."ratings" (
    "rating_id" integer NOT NULL,
    "customer_id" integer NOT NULL,
    "movie_id" integer NOT NULL,
    "rating_value" integer NOT NULL,
    "review" "text",
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ratings_rating_value_check" CHECK ((("rating_value" >= 1) AND ("rating_value" <= 5)))
);


ALTER TABLE "public"."ratings" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."ratings_rating_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."ratings_rating_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."ratings_rating_id_seq" OWNED BY "public"."ratings"."rating_id";



CREATE TABLE IF NOT EXISTS "public"."rooms" (
    "room_id" integer NOT NULL,
    "cinema_id" integer NOT NULL,
    "name" character varying(100) NOT NULL,
    "capacity" integer NOT NULL,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE "public"."rooms" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."rooms_room_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."rooms_room_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."rooms_room_id_seq" OWNED BY "public"."rooms"."room_id";



CREATE TABLE IF NOT EXISTS "public"."saves" (
    "customer_id" integer NOT NULL,
    "movie_id" integer NOT NULL,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE "public"."saves" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."seats" (
    "seat_id" integer NOT NULL,
    "room_id" integer NOT NULL,
    "row" integer NOT NULL,
    "col" integer NOT NULL,
    "seat_label" character varying(10) NOT NULL
);


ALTER TABLE "public"."seats" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."seats_seat_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."seats_seat_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."seats_seat_id_seq" OWNED BY "public"."seats"."seat_id";



CREATE TABLE IF NOT EXISTS "public"."showtimes" (
    "showtime_id" integer NOT NULL,
    "movie_id" integer NOT NULL,
    "room_id" integer NOT NULL,
    "start_time" timestamp without time zone NOT NULL,
    "end_time" timestamp without time zone NOT NULL,
    "price" numeric(10,2) NOT NULL,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE "public"."showtimes" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."showtimes_showtime_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."showtimes_showtime_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."showtimes_showtime_id_seq" OWNED BY "public"."showtimes"."showtime_id";



CREATE TABLE IF NOT EXISTS "public"."tickets" (
    "ticket_id" integer NOT NULL,
    "showtime_id" integer NOT NULL,
    "invoice_id" integer NOT NULL,
    "seat_id" integer NOT NULL,
    "price" numeric(10,2) NOT NULL,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE "public"."tickets" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."tickets_ticket_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."tickets_ticket_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."tickets_ticket_id_seq" OWNED BY "public"."tickets"."ticket_id";



ALTER TABLE ONLY "public"."admins" ALTER COLUMN "user_id" SET DEFAULT "nextval"('"public"."admins_user_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."cinemas" ALTER COLUMN "cinema_id" SET DEFAULT "nextval"('"public"."cinemas_cinema_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."customers" ALTER COLUMN "customer_id" SET DEFAULT "nextval"('"public"."customers_customer_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."invoices" ALTER COLUMN "invoice_id" SET DEFAULT "nextval"('"public"."invoices_invoice_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."movies" ALTER COLUMN "movie_id" SET DEFAULT "nextval"('"public"."movies_movie_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."products" ALTER COLUMN "product_id" SET DEFAULT "nextval"('"public"."products_product_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."ratings" ALTER COLUMN "rating_id" SET DEFAULT "nextval"('"public"."ratings_rating_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."rooms" ALTER COLUMN "room_id" SET DEFAULT "nextval"('"public"."rooms_room_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."seats" ALTER COLUMN "seat_id" SET DEFAULT "nextval"('"public"."seats_seat_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."showtimes" ALTER COLUMN "showtime_id" SET DEFAULT "nextval"('"public"."showtimes_showtime_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."tickets" ALTER COLUMN "ticket_id" SET DEFAULT "nextval"('"public"."tickets_ticket_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."admins"
    ADD CONSTRAINT "admins_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."admins"
    ADD CONSTRAINT "admins_pkey" PRIMARY KEY ("user_id");



ALTER TABLE ONLY "public"."cinemas"
    ADD CONSTRAINT "cinemas_pkey" PRIMARY KEY ("cinema_id");



ALTER TABLE ONLY "public"."customers"
    ADD CONSTRAINT "customers_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."customers"
    ADD CONSTRAINT "customers_pkey" PRIMARY KEY ("customer_id");



ALTER TABLE ONLY "public"."invoice_products"
    ADD CONSTRAINT "invoice_products_pkey" PRIMARY KEY ("invoice_id", "product_id");



ALTER TABLE ONLY "public"."invoices"
    ADD CONSTRAINT "invoices_pkey" PRIMARY KEY ("invoice_id");



ALTER TABLE ONLY "public"."movies"
    ADD CONSTRAINT "movies_pkey" PRIMARY KEY ("movie_id");



ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_pkey" PRIMARY KEY ("product_id");



ALTER TABLE ONLY "public"."ratings"
    ADD CONSTRAINT "ratings_pkey" PRIMARY KEY ("rating_id");



ALTER TABLE ONLY "public"."rooms"
    ADD CONSTRAINT "rooms_pkey" PRIMARY KEY ("room_id");



ALTER TABLE ONLY "public"."saves"
    ADD CONSTRAINT "saves_pkey" PRIMARY KEY ("customer_id", "movie_id");



ALTER TABLE ONLY "public"."seats"
    ADD CONSTRAINT "seats_pkey" PRIMARY KEY ("seat_id");



ALTER TABLE ONLY "public"."showtimes"
    ADD CONSTRAINT "showtimes_pkey" PRIMARY KEY ("showtime_id");



ALTER TABLE ONLY "public"."tickets"
    ADD CONSTRAINT "tickets_pkey" PRIMARY KEY ("ticket_id");



ALTER TABLE ONLY "public"."invoice_products"
    ADD CONSTRAINT "invoice_products_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("invoice_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."invoice_products"
    ADD CONSTRAINT "invoice_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."invoices"
    ADD CONSTRAINT "invoices_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("customer_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."ratings"
    ADD CONSTRAINT "ratings_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("customer_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."ratings"
    ADD CONSTRAINT "ratings_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("movie_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."rooms"
    ADD CONSTRAINT "rooms_cinema_id_fkey" FOREIGN KEY ("cinema_id") REFERENCES "public"."cinemas"("cinema_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."saves"
    ADD CONSTRAINT "saves_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("customer_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."saves"
    ADD CONSTRAINT "saves_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("movie_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."seats"
    ADD CONSTRAINT "seats_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("room_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."showtimes"
    ADD CONSTRAINT "showtimes_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("movie_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."showtimes"
    ADD CONSTRAINT "showtimes_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("room_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."tickets"
    ADD CONSTRAINT "tickets_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("invoice_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."tickets"
    ADD CONSTRAINT "tickets_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "public"."seats"("seat_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."tickets"
    ADD CONSTRAINT "tickets_showtime_id_fkey" FOREIGN KEY ("showtime_id") REFERENCES "public"."showtimes"("showtime_id") ON DELETE CASCADE;



GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



GRANT ALL ON TABLE "public"."admins" TO "anon";
GRANT ALL ON TABLE "public"."admins" TO "authenticated";
GRANT ALL ON TABLE "public"."admins" TO "service_role";



GRANT ALL ON SEQUENCE "public"."admins_user_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."admins_user_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."admins_user_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."cinemas" TO "anon";
GRANT ALL ON TABLE "public"."cinemas" TO "authenticated";
GRANT ALL ON TABLE "public"."cinemas" TO "service_role";



GRANT ALL ON SEQUENCE "public"."cinemas_cinema_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."cinemas_cinema_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."cinemas_cinema_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."customers" TO "anon";
GRANT ALL ON TABLE "public"."customers" TO "authenticated";
GRANT ALL ON TABLE "public"."customers" TO "service_role";



GRANT ALL ON SEQUENCE "public"."customers_customer_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."customers_customer_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."customers_customer_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."invoice_products" TO "anon";
GRANT ALL ON TABLE "public"."invoice_products" TO "authenticated";
GRANT ALL ON TABLE "public"."invoice_products" TO "service_role";



GRANT ALL ON TABLE "public"."invoices" TO "anon";
GRANT ALL ON TABLE "public"."invoices" TO "authenticated";
GRANT ALL ON TABLE "public"."invoices" TO "service_role";



GRANT ALL ON SEQUENCE "public"."invoices_invoice_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."invoices_invoice_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."invoices_invoice_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."movies" TO "anon";
GRANT ALL ON TABLE "public"."movies" TO "authenticated";
GRANT ALL ON TABLE "public"."movies" TO "service_role";



GRANT ALL ON SEQUENCE "public"."movies_movie_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."movies_movie_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."movies_movie_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."products" TO "anon";
GRANT ALL ON TABLE "public"."products" TO "authenticated";
GRANT ALL ON TABLE "public"."products" TO "service_role";



GRANT ALL ON SEQUENCE "public"."products_product_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."products_product_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."products_product_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."ratings" TO "anon";
GRANT ALL ON TABLE "public"."ratings" TO "authenticated";
GRANT ALL ON TABLE "public"."ratings" TO "service_role";



GRANT ALL ON SEQUENCE "public"."ratings_rating_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."ratings_rating_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."ratings_rating_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."rooms" TO "anon";
GRANT ALL ON TABLE "public"."rooms" TO "authenticated";
GRANT ALL ON TABLE "public"."rooms" TO "service_role";



GRANT ALL ON SEQUENCE "public"."rooms_room_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."rooms_room_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."rooms_room_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."saves" TO "anon";
GRANT ALL ON TABLE "public"."saves" TO "authenticated";
GRANT ALL ON TABLE "public"."saves" TO "service_role";



GRANT ALL ON TABLE "public"."seats" TO "anon";
GRANT ALL ON TABLE "public"."seats" TO "authenticated";
GRANT ALL ON TABLE "public"."seats" TO "service_role";



GRANT ALL ON SEQUENCE "public"."seats_seat_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."seats_seat_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."seats_seat_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."showtimes" TO "anon";
GRANT ALL ON TABLE "public"."showtimes" TO "authenticated";
GRANT ALL ON TABLE "public"."showtimes" TO "service_role";



GRANT ALL ON SEQUENCE "public"."showtimes_showtime_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."showtimes_showtime_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."showtimes_showtime_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."tickets" TO "anon";
GRANT ALL ON TABLE "public"."tickets" TO "authenticated";
GRANT ALL ON TABLE "public"."tickets" TO "service_role";



GRANT ALL ON SEQUENCE "public"."tickets_ticket_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."tickets_ticket_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."tickets_ticket_id_seq" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";







RESET ALL;
