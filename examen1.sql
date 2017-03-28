--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: inventory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE inventory (
    user_id integer NOT NULL,
    item_id integer NOT NULL,
    amount integer NOT NULL
);


ALTER TABLE inventory OWNER TO postgres;

--
-- Name: items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE items (
    item_id integer NOT NULL,
    item_name character varying(2044) NOT NULL,
    cost integer NOT NULL
);


ALTER TABLE items OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE users (
    user_id integer NOT NULL,
    gold integer NOT NULL
);


ALTER TABLE users OWNER TO postgres;

--
-- Data for Name: inventory; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO inventory VALUES (1, 2, 5);
INSERT INTO inventory VALUES (1, 1, 3);
INSERT INTO inventory VALUES (2, 1, 1);
INSERT INTO inventory VALUES (3, 1, 2);


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO items VALUES (1, 'Bread', 50);
INSERT INTO items VALUES (2, 'water', 20);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO users VALUES (1, 1000);
INSERT INTO users VALUES (2, 2000);
INSERT INTO users VALUES (3, 9001);


--
-- Name: items Items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY items
    ADD CONSTRAINT "Items_pkey" PRIMARY KEY (item_id);


--
-- Name: users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (user_id);


--
-- Name: index_Cost; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "index_Cost" ON items USING btree (cost);


--
-- Name: index_Gold; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "index_Gold" ON users USING btree (gold);


--
-- Name: index_Item_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "index_Item_id" ON inventory USING btree (item_id);


--
-- Name: index_Item_id1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "index_Item_id1" ON items USING btree (item_id);


--
-- Name: index_Item_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "index_Item_name" ON items USING btree (item_name);


--
-- Name: index_User_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "index_User_id" ON users USING btree (user_id);


--
-- Name: index_User_id1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "index_User_id1" ON inventory USING btree (user_id);


--
-- Name: index_amount; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX index_amount ON inventory USING btree (amount);


--
-- Name: inventory lnk_items_inventory; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY inventory
    ADD CONSTRAINT lnk_items_inventory FOREIGN KEY (item_id) REFERENCES items(item_id) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: inventory lnk_users_inventory; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY inventory
    ADD CONSTRAINT lnk_users_inventory FOREIGN KEY (user_id) REFERENCES users(user_id) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

