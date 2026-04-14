export interface SidePanelLink {
    name: string,
    link: string,
    tooltip: string,
    icon?: string,
    sublinks?: SidePanelLink[];
}

export const MAIN_LINKS: SidePanelLink[] = [
    {
        name: "Home",
        link: "/",
        tooltip: "Return to the home page",
        icon: "home"
    },
    {
        name: "Geography",
        link: "/geography",
        tooltip: "Learn about the world of Theia",
        icon: "public",
        sublinks: [
            {
                name: "World map",
                link: "/world-map",
                tooltip: "Explore the interactive world map",
                icon: "map"
            },
            {
                name: "Nations",
                link: "/info?content=nations",
                tooltip: "Read about the main nation-states on Theia",
                icon: "flag"
            },
            {
                name: "Climate",
                link: "/info?content=climate",
                tooltip: "Learn about the different climates on Theia",
                icon: "air"
            },
        ]
    },
    {
        name: "Society",
        link: "/society",
        tooltip: "Learn about the people of Theia",
        icon: "people",
        sublinks: [
            {
                name: "Races",
                link: "/map",
                tooltip: "Read about Theia's various races & species",
                icon: "cruelty_free"
            },
            {
                name: "Gods",
                link: "/gods",
                tooltip: "Learn about the greater & lesser pantheons",
                icon: "account_balance"
            },
            {
                name: "Organisations",
                link: "/info?content=organisations",
                tooltip: "Details on the most influential groups & organisations",
                icon: "groups3"
            },
              {
                name: "Notable people",
                link: "/info?content=notable-people",
                tooltip: "Read about those that have made history",
                icon: "person_pin_circle"
            },
        ]
    },
    {
        name: "History",
        link: "/history",
        tooltip: "Learn about the people of Theia",
        icon: "auto_stories",
        sublinks: [
            {
                name: "The beginning",
                link: "/info?content=the-beginning",
                tooltip: "Read about the forming of the world",
                icon: "start"
            },
            {
                name: "The age of legends",
                link: "/info?content=the-age-of-legends",
                tooltip: "Learn about when stories were made",
                icon: "hourglass_empty"
            },
            {
                name: "The breaking",
                link: "/info?content=the-breaking",
                tooltip: "[REDACTED]",
                icon: "hourglass_bottom"
            },
            {
                name: "The new age",
                link: "/info?content=the-new-age",
                tooltip: "On the state of the world today",
                icon: "hourglass_full"
            },
            {
                name: "Magic",
                link: "/info?content=magic",
                tooltip: "Learn about Theia's magical systems",
                icon: "auto_fix_high"
            },
            {
                name: "Relics",
                link: "/info?content=relics",
                tooltip: "Read about powerful items lost & found",
                icon: "hardware"
            }
        ]
    },
    {
        name: "Meta",
        link: "/meta",
        tooltip: "Learn about the people of Theia",
        icon: "videogame_asset",
        sublinks: [
            {
                name: "From the DM",
                link: "/info?content=rules-of-conduct",
                tooltip: "Introduction from the DM & house rules",
                icon: "gavel"
            },
            {
                name: "Session recaps",
                link: "/info?content=session-recaps",
                tooltip: "Recaps on each session",
                icon: "replay"
            },
            {
                name: "Cookies & privacy",
                link: "/info?content=privacy",
                tooltip: "Details on cookies & privacy policy",
                icon: "cookie"
            }
        ]
    }
]