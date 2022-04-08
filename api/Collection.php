<?php
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

class Collection
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

  public function jsonSerialize()
  {
    return $this->items;
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
}
