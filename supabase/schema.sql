    -- Enable UUID extension
    create extension if not exists "uuid-ossp";

    -- Profiles table (users)
    create table public.profiles (
    id uuid references auth.users not null primary key,
    email text not null,
    name text,
    image_url text,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
    );

    -- Servers table
    create table public.servers (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    image_url text,
    invite_code text unique not null,
    profile_id uuid references public.profiles(id) on delete cascade not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
    );

    -- Members table
    create type member_role as enum ('ADMIN', 'MODERATOR', 'GUEST');

    create table public.members (
    id uuid default uuid_generate_v4() primary key,
    role member_role default 'GUEST'::member_role not null,
    profile_id uuid references public.profiles(id) on delete cascade not null,
    server_id uuid references public.servers(id) on delete cascade not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
    );

    -- Channels table
    create type channel_type as enum ('TEXT', 'AUDIO', 'VIDEO');

    create table public.channels (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    type channel_type default 'TEXT'::channel_type not null,
    profile_id uuid references public.profiles(id) on delete cascade not null,
    server_id uuid references public.servers(id) on delete cascade not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
    );

    -- Messages table
    create table public.messages (
    id uuid default uuid_generate_v4() primary key,
    content text not null,
    file_url text,
    member_id uuid references public.members(id) on delete cascade not null,
    channel_id uuid references public.channels(id) on delete cascade not null,
    deleted boolean default false not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
    );

    -- Triggers for updated_at
    create or replace function public.handle_updated_at()
    returns trigger as $$
    begin
    new.updated_at = now();
    return new;
    end;
    $$ language plpgsql;

    create trigger handle_updated_at
    before update on public.profiles
    for each row execute procedure public.handle_updated_at();

    create trigger handle_updated_at
    before update on public.servers
    for each row execute procedure public.handle_updated_at();

    create trigger handle_updated_at
    before update on public.members
    for each row execute procedure public.handle_updated_at();

    create trigger handle_updated_at
    before update on public.channels
    for each row execute procedure public.handle_updated_at();

    create trigger handle_updated_at
    before update on public.messages
    for each row execute procedure public.handle_updated_at();

    -- Trigger for new user profile creation
    create or replace function public.handle_new_user()
    returns trigger as $$
    begin
    insert into public.profiles (id, email, name, image_url)
    values (new.id, new.email, new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'avatar_url');
    return new;
    end;
    $$ language plpgsql security definer set search_path = public;

    create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();
