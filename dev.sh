#!/bin/bash
docker run --rm -ti -v $(pwd)/src:/src -p 10005:4200 login-ui /bin/sh
