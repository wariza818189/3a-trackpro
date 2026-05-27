FROM php:8.4-apache

# 1. Install system dependencies, PHP extensions, and Node.js
RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libonig-dev libxml2-dev libpq-dev \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd

# 2. Enable mod_rewrite for Laravel routes
RUN a2enmod rewrite

# 3. Set working directory
WORKDIR /var/www/html

# 4. Point Apache document root to Laravel's /public folder
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 5. Copy all files to the server
COPY . /var/www/html

# 6. Install Composer and PHP dependencies
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader
RUN rm -rf bootstrap/cache/*.php

# 7. Set correct permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/public

# 8. Make entrypoint script executable
RUN chmod +x /var/www/html/docker-entrypoint.sh

# 9. Use entrypoint script to generate .env from Render env vars and start Apache
CMD ["/var/www/html/docker-entrypoint.sh"]