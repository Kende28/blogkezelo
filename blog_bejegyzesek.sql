-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Nov 26. 17:16
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `13de_weboldal`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `blog_bejegyzesek`
--

CREATE TABLE `blog_bejegyzesek` (
  `id` int(32) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `author` varchar(100) NOT NULL,
  `visible` tinyint(1) NOT NULL,
  `createdAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `blog_bejegyzesek`
--

INSERT INTO `blog_bejegyzesek` (`id`, `title`, `content`, `author`, `visible`, `createdAt`) VALUES
(1, 'Első blogbejegyzés', 'Ez az első teszt bejegyzés tartalma. A blog hamarosan új funkciókkal bővül.', 'Kiss Péter', 1, '2024-10-01'),
(2, 'Hétvégi kirándulás', 'A hétvégén ellátogattunk a Mátrába. Gyönyörű idő volt, sok fényképet készítettünk.', 'Nagy Anna', 1, '2024-10-05'),
(3, 'Fejlesztési napló #1', 'Elkezdődött a rendszer fejlesztése. Az adatbázis struktúra már majdnem kész.', 'Fejlesztő Béla', 0, '2024-09-28'),
(4, 'Kedvenc receptek', 'Ebben a bejegyzésben összegyűjtöttem a kedvenc őszi receptjeimet.', 'Kovács Júlia', 1, '2024-10-07'),
(5, 'Teszt bejegyzés törléshez', 'Ezt a bejegyzést csak tesztelés céljából hoztam létre.', 'Teszt Elek', 0, '2024-10-06'),
(6, 'Utazás Olaszországba', 'Rövid beszámoló az olaszországi nyaralásunkról: Róma, Firenze és Velence is csodálatos volt.', 'Szabó Márton', 1, '2024-07-15'),
(7, 'Fejlesztési napló #2', 'Az admin felület elkészült, a jogosultságkezelés még hátra van.', 'Fejlesztő Béla', 1, '2024-10-08'),
(8, 'Könyvajánló októberre', 'Három új könyvet ajánlok, amelyeket ebben a hónapban olvastam.', 'Nagy Anna', 1, '2024-10-09');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `blog_bejegyzesek`
--
ALTER TABLE `blog_bejegyzesek`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `blog_bejegyzesek`
--
ALTER TABLE `blog_bejegyzesek`
  MODIFY `id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
