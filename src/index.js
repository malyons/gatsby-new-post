#!/usr/bin/env node
const fs = require("fs");
const slugify = require("slug");
const dateFns = require("date-fns");

const title = process.argv[2];

if (!title) throw "a title is required!";

const slug = slugify(title.toLowerCase());
const date = dateFns.format(new Date(), "yyyy-mm-dd");
const dir = `./content/blog/${date}-${slug}`;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true }, err => {
    console.log(err);
  });
} else {
  throw `That post already exists!`;
}

fs.writeFileSync(
  `${dir}/index.mdx`,
  `---
title: ${title}
slug: ${slug}
date: ${date}
published: false
---`,
  err => {
    if (err) return console.log(err);

    console.log(`${title} was created!`);
  }
);

console.log(`slug: ${slug}
date: ${date}`);
