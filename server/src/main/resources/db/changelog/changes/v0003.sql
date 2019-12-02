create table plan (
	id bigserial not null,
	date_created timestamp default now(),
	primary key (id)
);

create table aviary (
	id bigserial not null,
	first_animal bigint references animal (id),
	second_animal bigint references animal (id),
	plan_id bigint references plan (id),
	primary key (id)
);