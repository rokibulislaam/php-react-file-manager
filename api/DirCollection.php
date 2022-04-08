<?php

require('./Collection.php');

/*
 * This file is part of the FileGator package.
 *
 * (c) Milos Stojanovic <alcalbg@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE file
 */

 /**
  * The code has been modified from FileGator project, licensed under MIT.
  * https://github.com/filegator/filegator/blob/master/LICENSE
  */

  
class DirectoryCollection
{

  public $items = [];

  public function add($obj)
  {
    return $this->items[] = $obj;
  }

  public function delete($obj)
  {
    foreach ($this->items as $key => $item) {
      if ($item === $obj) {
        unset($this->items[$key]);
      }
    }
  }

  public function all()
  {
    return $this->items;
  }

  public function length()
  {
    return count($this->items);
  }

  public function sortByValue($value, $desc = false)
  {
    usort($this->items, function ($a, $b) use ($value) {
      return $a[$value] <=> $b[$value];
    });

    if ($desc) {
      $this->items = array_reverse($this->items);
    }

    return $this;
  }


  public function __construct($location)
  {
    $this->location = $location;
  }

  public function addFile(string $type, string $path, string $name, string $size, string $timestamp)
  {
    if (!in_array($type, ['dir', 'file', 'back'])) {
      throw new \Exception('Invalid file type.');
    }

    $this->add([
      'type' => $type,
      'path' => $path,
      'name' => $name,
      'size' => $size,
      'time' => $timestamp,
    ]);
  }

  public function resetTimestamps($timestamp = 0)
  {
    foreach ($this->items as &$item) {
      $item['time'] = $timestamp;
    }
  }

  public function jsonSerialize()
  {
    $this->sortByValue('type');

    return [
      'location' => $this->location,
      'files' => $this->items,
    ];
  }
}
