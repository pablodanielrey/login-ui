docker run --rm -ti oryd/hydra:v1.5 clients delete login-ui --fake-tls-termination --endpoint http://localhost:4445
docker run --rm -ti oryd/hydra:v1.5 clients create --skip-tls-verify --fake-tls-termination --endpoint http://localhost:4445 \
    --id login-ui \
    --secret ppp \
    --grant-types implicit \
    --response-types id_token,token,"id_token token" \
    --callbacks https://login.econo.unlp.edu.ar/auth/oauth2,https://www.login.econo.unlp.edu.ar/auth/oauth2,https://login.testing.econo.unlp.edu.ar/auth/oauth2,https://www.login.testing.econo.unlp.edu.ar/auth/oauth2,http://localhost:10005/auth/oauth2 \
    --scope openid,profile,offline,* \
    --client-uri https://login.testing.econo.unlp.edu.ar
