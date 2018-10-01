#!/bin/bash
echo "abrir el explorador en http://localhost:10005"
docker run --rm -ti -v $(pwd)/src:/src -p 10005:4200 login-ui /bin/sh
