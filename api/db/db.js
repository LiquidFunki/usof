const mysql = require("mysql2");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

var query_str1 = fs.readFileSync("./db/category.sql").toString();
var query_str2 = fs.readFileSync("./db//user.sql").toString();
var query_str3 = fs.readFileSync("./db/post.sql").toString();
var query_str4 = fs.readFileSync("./db/comment.sql").toString();
var query_str5 = fs.readFileSync("./db/like.sql").toString();
var query_str6 = fs.readFileSync("./db/token.sql").toString();
var query_str7 = fs.readFileSync("./db/postCategory.sql").toString();

const query_strs = [query_str1, query_str2, query_str3, query_str4, query_str5, query_str6, query_str7];
// query_strs.push(
//   "INSERT IGNORE INTO category (title, description) VALUES ('Bebra1', 'bebra1 is a new software');"
// );
// query_strs.push(
//   "INSERT IGNORE INTO category (title, description) VALUES ('Bebra2', 'bebra2 is a new framework');"
// );
// query_strs.push(
//   "INSERT IGNORE INTO category (title, description) VALUES ('Bebra3', 'bebra3 is a new IDE');"
// );
query_strs.push(
"INSERT IGNORE into user (login, password, full_name, email, rating, is_active, activation_link, role) values ('csorley0', '$2b$04$aItcsGjjG9.zNYolJIxKJOAtTav3GbVz/6mYdvJpL8q6V0ng9NIcC', 'Caren Sorley', 'csorley0@addtoany.com', 25, 1, 'In sagittis dui vel nisl.', 'user');",
"INSERT IGNORE into user (login, password, full_name, email, rating, is_active, activation_link, role) values ('olett1', '$2b$04$aItcsGjjG9.zNYolJIxKJOAtTav3GbVz/6mYdvJpL8q6V0ng9NIcC', 'Orsola Lett', 'olett1@bandcamp.com', 14, 1, 'In quis justo.', 'admin');",
"INSERT IGNORE into user (login, password, full_name, email, rating, is_active, activation_link, role) values ('mcherrison2', '$2b$04$aItcsGjjG9.zNYolJIxKJOAtTav3GbVz/6mYdvJpL8q6V0ng9NIcC', 'Melissa Cherrison', 'mcherrison2@sun.com', 27, 1, 'Phasellus in felis.', 'user');",
"INSERT IGNORE into user (login, password, full_name, email, rating, is_active, activation_link, role) values ('mpolland3', '$2b$04$aItcsGjjG9.zNYolJIxKJOAtTav3GbVz/6mYdvJpL8q6V0ng9NIcC', 'Meade Polland', 'mpolland3@theglobeandmail.com', 57, 1, 'Vivamus vel nulla eget eros elementum pellentesque.', 'user');",
"INSERT IGNORE into user (login, password, full_name, email, rating, is_active, activation_link, role) values ('dortiga4', '$2b$04$aItcsGjjG9.zNYolJIxKJOAtTav3GbVz/6mYdvJpL8q6V0ng9NIcC', 'Delbert Ortiga', 'dortiga4@eepurl.com', 44, 1, 'Nulla nisl.', 'user');",
"INSERT IGNORE into user (login, password, full_name, email, rating, is_active, activation_link, role) values ('nvanetti5', '$2b$04$aItcsGjjG9.zNYolJIxKJOAtTav3GbVz/6mYdvJpL8q6V0ng9NIcC', 'Nettle Vanetti', 'nvanetti5@bing.com', 45, 1, 'Pellentesque ultrices mattis odio.', 'user');",
"INSERT IGNORE into user (login, password, full_name, email, rating, is_active, activation_link, role) values ('dsirman6', '$2b$04$aItcsGjjG9.zNYolJIxKJOAtTav3GbVz/6mYdvJpL8q6V0ng9NIcC', 'Dorri Sirman', 'dsirman6@wired.com', 37, 1, 'In eleifend quam a odio.', 'user');",
"INSERT IGNORE into user (login, password, full_name, email, rating, is_active, activation_link, role) values ('tbarlas7', '$2b$04$aItcsGjjG9.zNYolJIxKJOAtTav3GbVz/6mYdvJpL8q6V0ng9NIcC', 'Tessie Barlas', 'tbarlas7@patch.com', 4, 1, 'Vestibulum rutrum rutrum neque.', 'user');",
"INSERT IGNORE into user (login, password, full_name, email, rating, is_active, activation_link, role) values ('aroote8', '$2b$04$aItcsGjjG9.zNYolJIxKJOAtTav3GbVz/6mYdvJpL8q6V0ng9NIcC', 'Arley Roote', 'aroote8@shinystat.com', 64, 1, 'Cras pellentesque volutpat dui.', 'user');",
"INSERT IGNORE into user (login, password, full_name, email, rating, is_active, activation_link, role) values ('bwinterborne9', '$2b$04$aItcsGjjG9.zNYolJIxKJOAtTav3GbVz/6mYdvJpL8q6V0ng9NIcC', 'Brad Winterborne', 'bwinterborne9@diigo.com', 10, 1, 'Duis mattis egestas metus.', 'user');",
"INSERT IGNORE into user (login, password, full_name, email, rating, is_active, activation_link, role) values ('lmca', '$2b$04$aItcsGjjG9.zNYolJIxKJOAtTav3GbVz/6mYdvJpL8q6V0ng9NIcC', 'Levin Mc Gorley', 'lmca@wsj.com', 16, 1, 'Sed sagittis.', 'user');",
"INSERT IGNORE into user (login, password, full_name, email, rating, is_active, activation_link, role) values ('khussyb', '$2b$04$aItcsGjjG9.zNYolJIxKJOAtTav3GbVz/6mYdvJpL8q6V0ng9NIcC', 'Keary Hussy', 'khussyb@fastcompany.com', 100, 1, 'Pellentesque ultrices mattis odio.', 'user');",
"INSERT IGNORE into user (login, password, full_name, email, rating, is_active, activation_link, role) values ('wrathjenc', '$2b$04$aItcsGjjG9.zNYolJIxKJOAtTav3GbVz/6mYdvJpL8q6V0ng9NIcC', 'Wilona Rathjen', 'wrathjenc@cam.ac.uk', 23, 1, 'Ut tellus.', 'user');",
"INSERT IGNORE into user (login, password, full_name, email, rating, is_active, activation_link, role) values ('rlinceyd', '$2b$04$aItcsGjjG9.zNYolJIxKJOAtTav3GbVz/6mYdvJpL8q6V0ng9NIcC', 'Rollin Lincey', 'rlinceyd@theglobeandmail.com', 37, 1, 'Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.', 'admin');",
"INSERT IGNORE into user (login, password, full_name, email, rating, is_active, activation_link, role) values ('glavniyadmin', '$2b$04$P8wDFv0Syi.cic1Re64EJ.HpCLXahiljJDCJj6PxbEVDAhWhk50RS', 'Kuzya Jidkiy', 'admin1@gmail.com', 500, 1, 'cb8f7404-7ca5-4242-accd-a976ab471934', 'admin');"
)
query_strs.push(
"INSERT IGNORE into post (author_id, title, publish_date, status, content) values (5, 'Gigabox', '1641028989000', 'active', 'Fusce consequat.');",
"INSERT IGNORE into post (author_id, title, publish_date, status, content) values (3, 'Feedspan', '1649534454000', 'active', 'Aliquam non mauris.');",
"INSERT IGNORE into post (author_id, title, publish_date, status, content) values (8, 'Avaveo', '1651953734000', 'inactive', 'Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.');",
"INSERT IGNORE into post (author_id, title, publish_date, status, content) values (5, 'Skyndu', '1643747233000', 'inactive', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.');",
"INSERT IGNORE into post (author_id, title, publish_date, status, content) values (9, 'Mybuzz', '1650088824000', 'inactive', 'Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti.');",
"INSERT IGNORE into post (author_id, title, publish_date, status, content) values (4, 'Rhyloo', '1654686998000', 'inactive', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh.');",
"INSERT IGNORE into post (author_id, title, publish_date, status, content) values (2, 'Skaboo', '1646864122000', 'inactive', 'In hac habitasse platea dictumst.');",
"INSERT IGNORE into post (author_id, title, publish_date, status, content) values (9, 'Aibox', '1642202842000', 'active', 'Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.');",
"INSERT IGNORE into post (author_id, title, publish_date, status, content) values (3, 'Skilith', '1657095980000', 'inactive', 'Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue.');",
"INSERT IGNORE into post (author_id, title, publish_date, status, content) values (5, 'Voomm', '1638167348000', 'active', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque.');",
)
query_strs.push(
"INSERT IGNORE into comment (author_id, publish_date, content, post_id, status) values (6, '1638125091000', 'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 8, 'active');",
"INSERT IGNORE into comment (author_id, publish_date, content, post_id, status) values (11, '1635157746000', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus.', 2, 'inactive');",
"INSERT IGNORE into comment (author_id, publish_date, content, post_id, status) values (11, '1644062084000', 'Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam.', 4, 'inactive');",
"INSERT IGNORE into comment (author_id, publish_date, content, post_id, status) values (13, '1642355530000', 'Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna.', 9, 'inactive');",
"INSERT IGNORE into comment (author_id, publish_date, content, post_id, status) values (3, '1646299893000', 'Nulla ut erat id mauris vulputate elementum.', 6, 'inactive');",
"INSERT IGNORE into comment (author_id, publish_date, content, post_id, status) values (9, '1649067296000', 'Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio.', 7, 'inactive');",
"INSERT IGNORE into comment (author_id, publish_date, content, post_id, status) values (11, '1662780169000', 'Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum.', 5, 'active');",
"INSERT IGNORE into comment (author_id, publish_date, content, post_id, status) values (10, '1654528126000', 'Integer ac leo. Pellentesque ultrices mattis odio.', 9, 'inactive');",
"INSERT IGNORE into comment (author_id, publish_date, content, post_id, status) values (2, '1642664389000', 'Praesent id massa id nisl venenatis lacinia.', 10, 'inactive');",
"INSERT IGNORE into comment (author_id, publish_date, content, post_id, status) values (10, '1636881530000', 'Duis ac nibh.', 10, 'inactive');",
"INSERT IGNORE into comment (author_id, publish_date, content, post_id, status) values (12, '1647180843000', 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', 6, 'inactive');",
"INSERT IGNORE into comment (author_id, publish_date, content, post_id, status) values (4, '1642919721000', 'Etiam justo.', 3, 'inactive');",
"INSERT IGNORE into comment (author_id, publish_date, content, post_id, status) values (10, '1644330456000', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 2, 'active');",
"INSERT IGNORE into comment (author_id, publish_date, content, post_id, status) values (12, '1661549107000', 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus.', 7, 'active');",
"INSERT IGNORE into comment (author_id, publish_date, content, post_id, status) values (5, '1654850738000', 'Nullam molestie nibh in lectus. Pellentesque at nulla.', 4, 'inactive');"
)
query_strs.push(
"insert IGNORE into likes ( author_id, publish_date, entity_type, entity_id, type) values ( 9, '1664461874000', 'comment', 8, 'dislike');",
"insert IGNORE into likes ( author_id, publish_date, entity_type, entity_id, type) values ( 10, '1665959616000', 'post', 10, 'dislike');",
"insert IGNORE into likes ( author_id, publish_date, entity_type, entity_id, type) values ( 2, '1662586381000', 'post', 5, 'dislike');",
"insert IGNORE into likes ( author_id, publish_date, entity_type, entity_id, type) values ( 6, '1648515020000', 'comment', 7, 'dislike');",
"insert IGNORE into likes ( author_id, publish_date, entity_type, entity_id, type) values ( 2, '1643236330000', 'comment', 9, 'like');",
"insert IGNORE into likes ( author_id, publish_date, entity_type, entity_id, type) values ( 6, '1664129755000', 'post', 10, 'like');",
"insert IGNORE into likes ( author_id, publish_date, entity_type, entity_id, type) values ( 5, '1662693669000', 'post', 5, 'dislike');",
"insert IGNORE into likes ( author_id, publish_date, entity_type, entity_id, type) values ( 7, '1638864663000', 'comment', 2, 'dislike');",
"insert IGNORE into likes ( author_id, publish_date, entity_type, entity_id, type) values ( 14, '1651972264000', 'comment', 1, 'like');",
"insert IGNORE into likes ( author_id, publish_date, entity_type, entity_id, type) values ( 13, '1661756983000', 'comment', 2, 'like');",
"insert IGNORE into likes ( author_id, publish_date, entity_type, entity_id, type) values ( 2, '1636188827000', 'comment', 2, 'like');",
"insert IGNORE into likes ( author_id, publish_date, entity_type, entity_id, type) values ( 12, '1663048567000', 'comment', 7, 'dislike');",
"insert IGNORE into likes ( author_id, publish_date, entity_type, entity_id, type) values ( 4, '1653960274000', 'comment', 6, 'dislike');",
"insert IGNORE into likes ( author_id, publish_date, entity_type, entity_id, type) values ( 11, '1665549794000', 'post', 9, 'like');",
"insert IGNORE into likes ( author_id, publish_date, entity_type, entity_id, type) values ( 8, '1651090195000', 'comment', 4, 'like');",
"insert IGNORE into likes ( author_id, publish_date, entity_type, entity_id, type) values ( 9, '1655172452000', 'comment', 5, 'like');",
"insert IGNORE into likes ( author_id, publish_date, entity_type, entity_id, type) values ( 11, '1636202145000', 'post', 1, 'dislike');",
"insert IGNORE into likes ( author_id, publish_date, entity_type, entity_id, type) values ( 12, '1652870285000', 'post', 3, 'like');",
"insert IGNORE into likes ( author_id, publish_date, entity_type, entity_id, type) values ( 5, '1644412829000', 'post', 10, 'dislike');",
"insert IGNORE into likes ( author_id, publish_date, entity_type, entity_id, type) values ( 15, '1660775220000', 'comment', 8, 'dislike');"
)
query_strs.push(
  "INSERT IGNORE INTO `Category` (`id`,`title`,`description`) VALUES (NULL,'javascript','For questions regarding programming in ECMAScript  (JavaScript/JS) and its various dialects/implementations (excluding ActionScript). Note JavaScript is NOT the same as Java! Please include all relevant tags" +
  "on your question; e.g., [node.js], [jquery], [json], [reactjs], [angular], [ember.js], [vue.js], [typescript], [svelte], etc.'),(NULL,'python','Python is a multi-paradigm, dynamically typed, multi-purpose programming language. It is designed to be quick to learn, understand, and use, and enforces a clean and uniform syntax. Please note that Python 2 is officially out of support as of 2020-01-01. For version-specific Python questions, add the [python-2.7] or [python-3.x] tag. When using a Python variant (e.g. Jython, PyPy) or library (e.g. Pandas, NumPy), please include it in the tags.'),(NULL,'java','Java is a high-level object-oriented programming language. Use this tag when you&#39;re having problems using or understanding the language itself. This tag is frequently used alongside other tags for libraries and/or frameworks used by Java developers.'),(NULL,'c#','There is no description here'),(NULL,'php','PHP is a widely used," +
  "open source, general-purpose, multi-paradigm, dynamically typed and interpreted scripting language designed initially for server-side web development. Use this tag for questions about programming in the PHP language.'),(NULL,'android','Android is Google&#39;s mobile operating system, used for programming or developing digital devices (Smartphones, Tablets, Automobiles, TVs, Wear, Glass, IoT). For topics related to Android, use Android-specific tags such as android-intent, android-activity, android-adapter, etc. For questions other than development or programming but related to the Android framework, use this link: https://android.stackexchange.com.'),(NULL,'html','HTML (HyperText Markup Language) is the markup language for creating web pages and other information to be displayed in a web browser. Questions regarding HTML should include a minimal reproducible example and some idea of what you&#39;re trying to achieve. This tag is rarely used alone and is often paired with [CSS] and [JavaScript].'),(NULL,'jquery','jQuery is a JavaScript library. Consider also adding the JavaScript tag. \r\n\r\njQuery is a popular cross-browser JavaScript library that facilitates Document Object Model (DOM) traversal, event handling, animations and AJAX interactions by minimizing the discrepancies across browsers. A question tagged jQuery should be related to jQuery, so jQuery should be used by the code in question, and at least jQuery usage-related elements must be in the question.'),(NULL,'c++','C++ is a general-purpose programming language. It was originally designed as an extension to C and has a similar syntax, but it is now a completely different language. Use this tag for questions about code (to be) compiled with a C++ compiler. Use a version-specific tag for questions related to a specific standard revision [C++11], [C++14], [C++17], [C++20] or [C++23], etc.'),(NULL,'css','CSS (Cascading Style Sheets) is a representation style sheet language used for describing the look and formatting of HTML (HyperText Markup Language), XML (Extensible Markup Language) documents and SVG elements including (but not limited to) colors, layout, fonts, and animations. It also describes how " +
  "elements should be rendered on screen, on paper, in speech, or on other media.'),(NULL,'ios','iOS is the mobile operating system running on the Apple iPhone, iPod touch, and iPad. Use this tag [ios] for questions related to programming on the iOS platform. Use the related tags [objective-c] and [swift] for issues specific to those programming languages.'),(NULL,'mysql','MySQL is a free, open-source Relational Database Management System (RDBMS) that uses Structured Query Language (SQL).  DO NOT USE this tag for other DBs such as SQL Server, SQLite etc.  Those are different DBs that all use their own dialects of SQL to manage the data.'),(NULL,'sql','Structured Query Language (SQL) is a language for querying databases. Questions should include code examples, table structure, sample data, and a tag for the DBMS implementation (e.g. MySQL, PostgreSQL, Oracle, MS SQL Server, IBM DB2, etc.) being used. If your question relates solely" + 
  "to a specific DBMS (uses specific extensions/features), use that DBMS&#39;s tag instead. Answers to questions tagged with SQL should use ISO/IEC standard SQL.'),(NULL,'r','R is a free, open-source programming language &amp; software environment for statistical computing, bioinformatics, visualization &amp; general computing.  Please use minimal reproducible example(s) others can run using copy &amp; paste. Show desired output.  Use dput() for data &amp; specify all non-base packages with library().  Don&#39;t embed pictures for data or code, use indented code blocks instead. For statistics questions, use https://stats.stackexchange.com.'),(NULL,'node.js','Node.js is an event-based, non-blocking, asynchronous I/O runtime that uses Google&#39;s V8 JavaScript engine and libuv library. It is used for developing applications that make heavy use of the ability to run JavaScript both on the client as well as on the server side and therefore benefit from the re-usability of code and the lack of context switching.'),(NULL,'reactjs','React is a JavaScript library for building user interfaces. It uses a declarative, component-based paradigm and aims to be efficient and flexible.'),(NULL,'arrays','An array is an ordered linear data structure consisting of a collection of elements (values, variables, or references), each identified by one or more indexes. When asking about specific variants of arrays, use these related tags instead: [vector], [arraylist], [matrix]. When using this tag, in a question that is specific to a programming language, tag the question with the programming language being used.'),(NULL,'c','C is a general-purpose programming language used for system programming (OS and embedded), libraries, games and cross-platform. This tag should be used with general questions concerning the C language, as defined in the ISO 9899 standard (the latest version, 9899:2018, unless otherwise specified — also tag version-specific requests with c89, c99, c11, etc). C is distinct from C++ and it should not be combined " +
  "with the C++ tag absent a rational reason.'),(NULL,'asp.net','ASP.NET is a Microsoft web application development framework that allows programmers to build dynamic web sites, web applications and web services. It is useful to use this tag in conjunction with the project type tag e.g. [asp.net-mvc], [asp.net-webforms], or [asp.net-web-api]. Do NOT use this tag for questions about ASP.NET Core - use [asp.net-core] instead.'),(NULL,'json','JSON (JavaScript Object Notation) is a serializable data interchange format that is a machine and human readable. Do not use this tag for native JavaScript objects or JavaScript object literals. Before you ask a question, validate your JSON using a JSON validator such as JSONLint (https://jsonlint.com).'),(NULL,'ruby-on-rails','Ruby on Rails " +
  "is an open source full-stack web application framework written in Ruby. It follows the popular MVC framework model and is known for its &quot;convention over configuration&quot; approach to application development.'),(NULL,'python-3.x','DO NOT USE UNLESS YOUR QUESTION IS FOR PYTHON 3 ONLY. Always use alongside the standard [python] tag.'),(NULL,'.net','Do NOT use for questions about .NET Core - use [.net-core] instead. The .NET framework is a software framework designed mainly for the Microsoft Windows operating system. It includes an implementation of the Base Class Library, Common Language Runtime (commonly referred to as CLR), Common Type System (commonly referred to as CTS) and Dynamic Language Runtime. It supports many programming languages, including C#, VB.NET, F# and C++/CLI.'),(NULL,'sql-server','Microsoft SQL Server is a relational database management system (RDBMS). Use this tag for all Microsoft SQL Server editions including Compact, Express, Azure, Fast-track, APS (formerly PDW) and Azure SQL DW. Do not use this tag for other types of DBMS (MySQL, PostgreSQL, Oracle, etc.). Do not use this tag for issues on software and mobile development, unless it is directly related to the database.'),(NULL,'swift','Swift is a general-purpose programming language developed by Apple Inc first released in 2014 for its platforms and Linux. Swift is open-source. Use the tag only for questions about language features or requiring code in Swift. Use the tags [ios], [ipados], [macos], [watch-os], [tvos], [swiftui], [cocoa-touch], and [cocoa] for (language-agnostic) questions about the platforms or frameworks.'),(NULL,'django','Django is an open-source server-side web application framework written in Python. It is designed to reduce the effort required to create complex data-driven websites and web applications, with a special focus on less code, no-redundancy " +
  "and being more explicit than implicit.'),(NULL,'objective-c','This tag should be used only on questions that are about Objective-C features or depend on code in the language. The tags [cocoa] and [cocoa-touch] should be used to ask about Apple&#39;s frameworks or classes. Use the related tags [ios], [macos], [apple-watch] and [tvos] for issues specific to those platforms.'),(NULL,'angular','Questions about Angular (not to be confused with AngularJS), the web framework from Google. Use this tag for Angular questions which are not specific to an individual version. For the older AngularJS (1.x) web framework, use the AngularJS tag.'),(NULL,'excel','Only for questions on programming against Excel objects or files, or complex formula development. You may combine the Excel tag with VBA, VSTO, C#, VB.NET, PowerShell, OLE automation, and other programming related tags and questions if applicable. Do NOT use with other spreadsheet software like [google-sheets].\r\n\r\nGeneral help regarding Excel for single worksheet functions is available at Super User (http://superuser.com/).'),(NULL,'pandas','Pandas is a Python library for data manipulation and analysis, e.g. dataframes, multidimensional time series and cross-sectional datasets commonly found in statistics, experimental science results, econometrics, or finance. Pandas is one of the main data science libraries in Python.');"
  )
  query_strs.push(
  "INSERT IGNORE into postcategory (post_id, category_id) values (3, 13);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (9, 1);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (4, 21);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (5, 8);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (4, 16);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (5, 13);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (10, 11);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (5, 29);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (1, 19);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (1, 27);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (5, 7);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (3, 12);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (10, 18);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (3, 12);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (2, 16);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (9, 28);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (5, 2);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (3, 3);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (4, 3);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (7, 22);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (10, 5);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (1, 3);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (8, 28);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (9, 4);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (5, 16);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (10, 5);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (8, 1);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (4, 29);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (9, 1);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (6, 19);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (2, 21);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (3, 10);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (5, 26);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (10, 15);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (8, 20);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (9, 27);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (9, 14);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (10, 4);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (3, 3);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (2, 18);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (6, 3);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (8, 20);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (6, 13);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (10, 30);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (2, 7);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (5, 21);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (5, 13);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (4, 6);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (4, 15);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (2, 14);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (4, 10);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (9, 1);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (2, 15);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (2, 30);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (7, 12);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (6, 8);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (10, 29);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (10, 3);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (1, 4);",
  "INSERT IGNORE into postcategory (post_id, category_id) values (4, 17);"
  )
  
  
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
});

connection.connect(async (err) => {
  if (err) {
    console.log(
      "\n\nCREATE \"usof\" DATABASE BEFORE THE START!\nIt's enough to run the following command: 'node db/usof.js'\n\n"
    );
    console.error(err);
    return err;
  } else {
    // for (let i = 0; i < query_strs.length; i++) {
    //   const element = query_strs[i];
    //   await connection.promise().query(element);
    // }
    console.log(`Connected to ${process.env.DATABASE} db ------ OK`);
  }
});

module.exports = connection;
