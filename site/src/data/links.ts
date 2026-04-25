export interface SidePanelLink {
    name: string,
    link: string,
    tooltip?: string,
    icon?: string,
    sublinks?: SidePanelLink[];
}

export const MAIN_LINKS: SidePanelLink[] = [
    {
        name: "Introduction",
        link: "/",
        tooltip: "Getting started in Theia",
        icon: "home"
    },
    {
        name: "Geography",
        link: "/geography",
        icon: "public",
        sublinks: [
            {
                name: "World map",
                link: "/world-map",
                tooltip: "Explore the world map",
                icon: "map"
            },
               {
                name: "Camorr map",
                link: "/camorr-map",
                tooltip: "Explore the world map",
                icon: "map"
            },
             {
                name: "Local maps",
                link: "/local-maps",
                tooltip: "Explore discovered local maps",
                icon: "location_city"
            },
            {
                name: "Nations",
                link: "/info?content=nations",
                tooltip: "Read about the main nation-states on Theia",
                icon: "flag"
            },
        ]
    },
    {
        name: "Society",
        link: "/society",
        icon: "people",
        sublinks: [
            {
                name: "Races",
                link: "/info?content=races",
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
        ]
    },
    {
        name: "Meta",
        link: "/meta",
        icon: "videogame_asset",
        sublinks: [
            {
                name: "From the DM",
                link: "/info?content=rules-of-conduct",
                tooltip: "Introduction from the DM & house rules",
                icon: "gavel"
            },
        ]
    }
]