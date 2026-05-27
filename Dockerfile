FROM php:8.4-apache

# 1. Pag-install sa system dependencies ug PostgreSQL driver
RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libonig-dev libxml2-dev libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd

# 2. I-enable ang mod_rewrite para mogana ang mga routes sa Laravel
RUN a2enmod rewrite

# 3. I-set ang working directory
WORKDIR /var/www/html

# 4. Usbon ang Apache root paingon sa /public folder sa Laravel
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 5. I-copy ang tibuok files nimo gikan sa GitHub paingon sa server
COPY . /var/www/html

# 6. Pag-install sa Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 7. Pag-install sa Laravel dependencies
RUN composer install --no-dev --optimize-autoloader

# KINI ANG SOLUSYON SA 127.0.0.1: Papason niya ang imong local config cache
RUN rm -rf bootstrap/cache/*.php

# 8. Hatagan ug saktong permission ang storage folder
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache