-- Active: 1696545196155@@127.0.0.1@3306@buscador

-- Create DB
create database Buscador;

use Buscador;

-- Create Table
CREATE TABLE Pages (
	Page_Id INT AUTO_INCREMENT PRIMARY KEY,
    Url VARCHAR(255) NOT NULL,
    Title VARCHAR(255) NOT NULL,
    Description Text,
    Icon VARCHAR(300),
    Keywords Text,
    Language VARCHAR(25),
    Seo_Rating INT
);

-- Create Store Procedure

DELIMITER //
CREATE PROCEDURE spInsertPage(
    p_Url VARCHAR(255),
    p_Title VARCHAR(255),
    p_Description TEXT,
    p_Icon VARCHAR(300),
    p_Keywords TEXT,
    p_Language VARCHAR(25),
    p_Seo_Rating INT
)
BEGIN
    INSERT INTO Pages (Url, Title, Description, Icon, Keywords, Language, Seo_Rating)
    VALUES (p_Url, p_Title, p_Description, p_Icon, p_Keywords, p_Language, p_Seo_Rating);
END //
DELIMITER ;

CALL spInsertPage("https://www.test.com", "Test Title", "abre Test Description", "https://www.test.com/icon.ico", "Test,Video Games,Books,Music,Video", "es", 100);
CALL spInsertPage("https://www.google.com", "Google", "abre El motor de búsqueda más utilizado en el mundo.", "https://www.google.com/favicon.ico", "Motor de búsqueda, Google, Búsqueda en línea, Internet, Buscar", "Multi", 90);
CALL spInsertPage("https://www.facebook.com", "Facebook", "abre La red social más grande y popular.", "https://www.facebook.com/favicon.ico", "Red social, Facebook, Amigos, Comunicación, Socializar", "Multi", 90);
CALL spInsertPage("https://www.youtube.com", "YouTube", "abre La plataforma de videos en línea más grande y utilizada.", "https://www.youtube.com/favicon.ico", "Videos en línea, YouTube, Entretenimiento, Subir videos", "Multi", 92);
CALL spInsertPage("https://www.amazon.com", "Amazon", " abre Uno de los principales sitios de comercio electrónico del mundo.", "https://www.amazon.com/favicon.ico", "Comercio electrónico, Amazon, Compras en línea, Productos, Tienda en línea", "Multi", 88);
CALL spInsertPage("https://www.twitter.com", "Twitter", "Una plataforma de microblogging y redes sociales.", "https://www.twitter.com/favicon.ico", "Microblogging, Twitter, Tweets, Redes sociales, Seguir", "Multi", 89);
CALL spInsertPage("https://www.wikipedia.org", "Wikipedia", " abre Una enciclopedia en línea de acceso abierto.", "https://www.wikipedia.org/static/favicon/wikipedia.ico", "Enciclopedia en línea, Wikipedia, Conocimiento, Colaborativo, Información", "Multi", 94);
CALL spInsertPage("https://www.netflix.com", "Netflix", "Un popular servicio de transmisión de películas y series de televisión.", "https://www.netflix.com/favicon.ico", "Transmisión de video, Netflix, Películas, Series de televisión, Entretenimiento", "Multi", 90);
CALL spInsertPage("https://www.instagram.com", "Instagram", "Una plataforma de redes sociales centrada en imágenes y videos.", "https://www.instagram.com/favicon.ico", "Red social, Instagram, Fotos, Videos, Compartir", "Multi", 91);
CALL spInsertPage("https://www.linkedin.com", "LinkedIn", "Una red social orientada a negocios y profesionales.", "https://www.linkedin.com/favicon.ico", "Red social profesional, LinkedIn, Perfil profesional, Networking, Empleo", "Multi", 87);
CALL spInsertPage("https://www.reddit.com", "Reddit", "Un sitio web de agregación de contenido y discusión en línea.", "https://www.reddit.com/favicon.ico", "Agregación de contenido, Reddit, Comunidad en línea, Foros, Discusión", "Multi", 88);

DELIMITER //pages
CREATE PROCEDURE spGetPagesPaged
(
    IN startRowIndex INT,
    IN maximumRows INT
)
BEGIN
    SELECT Page_Id, Url, Title, Description, Icon, Keywords, Language, Seo_Rating
    FROM
    (
        SELECT Page_Id, Url, Title, Description, Icon, Keywords, Language, Seo_Rating,
               ROW_NUMBER() OVER (ORDER BY Title) AS RowRank
        FROM Pages
    ) AS PagesWithRowNumbers
    WHERE RowRank > startRowIndex AND RowRank <= (startRowIndex + maximumRows);
END //
DELIMITER ;

CALL spGetPagesPaged('abre', 0, 5);


CREATE PROCEDURE spGetAllPages()
SELECT * FROM Pages;

CREATE PROCEDURE spGetPageByUrl(p_Url INT)
SELECT * FROM Pages where Url = p_Url;

CREATE PROCEDURE spGetPageByTitle(p_Title INT)
SELECT * FROM Pages where Title = p_Title;









/* Stored procedure para buscar una pagina */

DROP PROCEDURE IF EXISTS spSearchPage;

CREATE PROCEDURE spSearchPage(
    IN criterio VARCHAR(255),
    IN startRowIndex INT,
    IN maximumRows INT
)
BEGIN
    SELECT 
        Url, 
        Title, 
        Description, 
        Keywords
    FROM 
        Pages 
    WHERE 
        CONCAT(Url, Title, Description, Keywords) LIKE CONCAT('%', criterio, '%')
        OR SOUNDEX(Url) = SOUNDEX(criterio)
        OR SOUNDEX(Title) = SOUNDEX(criterio)
        OR SOUNDEX(Description) = SOUNDEX(criterio)
        OR SOUNDEX(Keywords) = SOUNDEX(criterio)
    ORDER BY 
        Seo_Rating DESC
    LIMIT 
        startRowIndex, maximumRows;
END;


CALL spSearchPage('social', 0, 15)
