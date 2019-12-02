create table animal (
	id bigserial not null,
	name varchar(100) not null,
	predator boolean not null,
	primary key (id)
);