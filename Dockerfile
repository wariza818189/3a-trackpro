FROM php:8.4-apache

# 1. Pag-install sa system dependencies, PHP extensions, ug Node.js
RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libonig-dev libxml2-dev libpq-dev \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd

# 2. I-enable ang mod_rewrite para mogana ang mga routes sa Laravel
RUN a2enmod rewrite

# 3. I-set ang working directory
WORKDIR /var/www/html

# 4. Usbon ang Apache root paingon sa /public folder sa Laravel
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 5. I-copy ang tibuok files nimo paingon sa server
COPY . /var/www/html

# 6. Pag-install sa Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader
RUN rm -rf bootstrap/cache/*.php

# 7. ANG MAGIC: I-install ang React dependencies ug i-build ang manifest.json
RUN npm install
RUN npm run build

# 8. Hatagan ug saktong permission ang mga folders (gi-apil ang public/build)
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/public