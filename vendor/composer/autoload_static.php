<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit3a3e2d56d493a27a4f7b881c3936e655
{
    public static $prefixLengthsPsr4 = array (
        'L' => 
        array (
            'League\\MimeTypeDetection\\' => 25,
            'League\\Flysystem\\' => 17,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'League\\MimeTypeDetection\\' => 
        array (
            0 => __DIR__ . '/..' . '/league/mime-type-detection/src',
        ),
        'League\\Flysystem\\' => 
        array (
            0 => __DIR__ . '/..' . '/league/flysystem/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit3a3e2d56d493a27a4f7b881c3936e655::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit3a3e2d56d493a27a4f7b881c3936e655::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit3a3e2d56d493a27a4f7b881c3936e655::$classMap;

        }, null, ClassLoader::class);
    }
}
