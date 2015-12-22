<?php
$directory = __DIR__.'/content';
$filename = $directory.'/content.md';
$files = [];

foreach ($iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($directory,
        RecursiveDirectoryIterator::SKIP_DOTS),
        RecursiveIteratorIterator::SELF_FIRST) as $item) 
{
    if (!$item->isDir())
    {
        $name = $iterator->getSubPathName();
        if ($name == '.htaccess') continue;
        
        array_push($files, $name);
    }
}

var_dump($files);

$content = "# Index \n\n";
$content .= "Voici la liste de tous les fichiers .md dans le répertoire content. 
            Ce fichier est auto généré par le script *generate_index.php*\n\n";
            
foreach ($files as $file) 
{
    $content .= '* ['.$file.']('.$file.")\n";
}

file_put_contents($filename, $content);