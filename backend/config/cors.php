<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie', 'users/*'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['*'], // Replace with your frontend's URL

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true, // Enables cookies
];
