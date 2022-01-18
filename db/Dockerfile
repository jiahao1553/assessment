FROM mongo

COPY collections/cafes.json /collections/cafes.json
COPY collections/employees.json /collections/employees.json

ADD start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]