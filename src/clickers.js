function calcMod(cps) {
    return 1 / cps;
}

const clickers = [
    {
        name: "Cursor",
        modifier: calcMod(0.1),
        cost: 15,
        count: 0,
        icon: "cursor.svg",
    },
    {
        name: "Windows user",
        modifier: calcMod(1),
        cost: 100,
        count: 0,
        icon: "win-logo.svg",
    },
    {
        name: "Mac user",
        modifier: calcMod(8),
        cost: 1100,
        count: 0,
        icon: "mac.svg",
    },
    {
        name: "Ubuntu user",
        modifier: calcMod(47),
        cost: 12000,
        count: 0,
        icon: "ubuntu.svg",
    },
    {
        name: "Arch user",
        modifier: calcMod(260),
        cost: 130000,
        count: 0,
        icon: "arch.svg",
    },
    {
        name: "Gentoo user",
        modifier: calcMod(1400),
        cost: 1400000,
        count: 0,
        icon: "gentoo.svg",
    },
    {
        name: "LFS user",
        modifier: calcMod(7800),
        cost: 20000000,
        count: 0,
        icon: "lfs.png",
    },
    {
        name: "FreeBSD user",
        modifier: calcMod(44000),
        cost: 330000000,
        count: 0,
        icon: "freebsd.svg",
    },
    {
        name: "TempleOS user",
        modifier: calcMod(260000),
        cost: 5100000000,
        count: 0,
        icon: "templeos.svg",
    },
    /*
        {
            name: "_ user",
            modifier: calcMod(1600000),
            cost: 75000000000,
            count: 0,
            icon: "",
        },
        {
            name: "_ user",
            modifier: calcMod(10000000),
            cost: 1000000000000,
            count: 0,
            icon: "",
        },
        {
            name: "_ user",
            modifier: calcMod(65000000),
            cost: 14000000000000,
            count: 0,
            icon: "",
        },
        {
            name: "_ user",
            modifier: calcMod(430000000),
            cost: 170000000000000,
            count: 0,
            icon: "",
        },
        {
            name: "_ user",
            modifier: calcMod(2900000000),
            cost: 2100000000000000,
            count: 0,
            icon: "",
        },
        {
            // big int required from here
            name: "_ user",
            modifier: calcMod(21000000000),
            cost: 26000000000000000,
            count: 0,
            icon: "",
        },
        {
            name: "_ user",
            modifier: calcMod(150000000000),
            cost: 310000000000000000,
            count: 0,
            icon: "",
        },
        {
            name: "_ user",
            modifier: calcMod(1100000000000),
            cost: 1000000000000000000,
            count: 0,
            icon: "",
        },
        {
            name: "_ user",
            modifier: calcMod(8300000000000),
            cost: 12000000000000000000000,
            count: 0,
            icon: "",
        },
        {
            name: "_ user",
            modifier: calcMod(64000000000000),
            cost: 1900000000000000000000000,
            count: 0,
            icon: "",
        },
        {
            name: "MX Linux user",
            modifier: calcMod(510000000000000),
            cost: 540000000000000000000000000,
            count: 0,
            icon: "",
        },
        */
    // https://cookieclicker.fandom.com/wiki/Building
];

export { clickers };
