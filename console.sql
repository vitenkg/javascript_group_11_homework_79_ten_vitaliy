create schema homework collate utf8_general_ci;

create table homework.category
(
    id            int auto_increment,
    name_category varchar(255) not null,
    description   text         null,
    constraint category_pk
        primary key (id)
);


create table homework.location
(
	id int auto_increment,
	name_location varchar(255) not null,
	description text null,
	constraint location_pk
		primary key (id)
);

create table homework.items
(
	id int auto_increment,
	category_id int not null ,
	location_id int not null,
	name varchar(255) not null,
	description text null,
	photo varchar(255) null ,
	constraint location_pk
		primary key (id),
	constraint items_category_id_fk
		foreign key (category_id) references category (id)
			on update cascade,
    constraint items_location_id_fk
		foreign key (location_id) references category (id)
			on update cascade
);


insert into homework.category (name_category, description)
values ('furniture', 'Офисная мебель'),
       ('Office equipment', 'Орг техника'),
       ('Other', 'Разное');

select * from   homework.category;

insert into homework.location (name_location, description)
values ('Head office', 'Головной офис'),
       ('office', 'Центральный офис'),
       ('Back office', 'Доп офис');

select * from homework.location;

insert into homework.items(category_id, location_id, name, description, photo)
values (1, 1, 'Chair', 'Стул', null),
       (1, 1, 'Table', 'Стол', null),
       (1, 1, 'Locker', 'Шкаф', null),
       (2, 1, 'Monitor', 'Дисплей', null),
       (2, 1, 'Keyboard', 'Клавивтура', null),
       (2, 1, 'Mouse', 'Копьбтерная мышь', null),
       (2, 1, 'Printer', 'Принтер', null),
       (2, 1, 'Copier', 'Ксерокс', null);

select * from homework.items;