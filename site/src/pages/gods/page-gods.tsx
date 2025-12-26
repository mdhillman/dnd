import { FC, useContext, useMemo } from "react";
import styles from "./page-gods.module.css";
import { Tooltip } from "@mui/material";
import { CookieContext } from "../../contexts";
import ChromaGrid, {
    ChromaItem,
} from "../../components/chroma-grid/chroma-grid";
import { KEY_THE_NINTH } from "../../data/keys";

const defaultTiles: ChromaItem[] = [
    {
        image: "/images/zareos.png",
        title: "Zareos",
        subtitle: "The Catalyst",
        url: "/info?content=zareos",
        borderColor: "#EF4444",
        gradient: "linear-gradient(195deg, #EF4444, #000)",
    },
    {
        image: "/images/oriana.png",
        title: "Oriana",
        subtitle: "The Bind",
        url: "/info?content=oriana",
        borderColor: "#8B5CF6",
        gradient: "linear-gradient(225deg, #8B5CF6, #000)",
    },
    {
        image: "/images/beldar.png",
        title: "Beldar",
        subtitle: "The Expanse",
        borderColor: "#06B6D4",
        gradient: "linear-gradient(135deg, #06B6D4, #000)",
    },
    {
        image: "/images/chronitos.png",
        title: "Chronitos",
        subtitle: "The Current",
        borderColor: "#B8860B",
        gradient: "linear-gradient(165deg, #B8860B, #000)",
    },
    {
        image: "/images/daesis.png",
        title: "Daesis",
        subtitle: "The Substance",
        borderColor: "#F59E0B",
        gradient: "linear-gradient(165deg, #F59E0B, #000)",
    },
    {
        image: "/images/kala.png",
        title: "Kala",
        subtitle: "The Unraveling",
        borderColor: "#556B2F",
        gradient: "linear-gradient(210deg, #556B2F, #000)",
    },
    {
        image: "/images/vitae.png",
        title: "Vitae",
        subtitle: "The Bloom",
        borderColor: "#10B981",
        gradient: "linear-gradient(210deg, #10B981, #000)",
    },
    {
        image: "/images/mort.png",
        title: "Mort",
        subtitle: "The Silence",
        borderColor: "#7FFFD4",
        gradient: "linear-gradient(165deg, #7FFFD4, #000)",
    },
];

const GodsPage: FC = () => {
    const cookies = useContext(CookieContext).sort();
    const showNinth = cookies.includes(KEY_THE_NINTH);
    const headerImage = "/images/gods.png";

    const godTiles = useMemo(() => {
        return !showNinth
            ? defaultTiles
            : [
                  ...defaultTiles,
                  {
                      image: "/images/ninth.png",
                      title: "Ninth",
                      subtitle: "The Lost",
                      borderColor: "#2F4F4F",
                      gradient: "linear-gradient(165deg, #2F4F4F, #000)",
                  },
              ];
    }, [showNinth]);

    const openImage = () => {
        if (!headerImage) return;
        window.open(headerImage, "_blank");
    };

    return (
        <div className={styles.container}>
            <Tooltip title="Click to view full image" followCursor>
                <img
                    className={styles.headerImage}
                    src={headerImage}
                    alt={headerImage}
                    onClick={openImage}
                />
            </Tooltip>

            <div className={styles.content}>
                <h1>The deities of Theia</h1>
                <p>
                    Theology in Theia is widely regarded not as a matter of
                    faith, but as a practical survival skill, akin to swimming
                    or knowing when to duck. Unlike the distant, ineffable
                    deities of other planes, the members of the Pantheon of the
                    Eight are manifestly, inconveniently real, and prone to
                    meddling in mortal affairs with the enthusiasm of bored
                    children poking at an anthill. Scholars and high priests
                    generally agree that the gods do not move in "mysterious
                    ways," but rather in loud, bickering, and often destructive
                    ways, usually resulting in unseasonal weather or the sudden
                    transmutation of livestock. Consequently, worship in Theia
                    is less about spiritual adoration and more about spiritual
                    insurance; one does not pray to the Eight to invite their
                    attention, but rather to politely request that they go
                    bother someone else.
                </p>

                <h2>The upper pantheon</h2>
                <p>
                    While the world is teeming with minor divinities, from
                    household spirits of lost socks to the petty demigods of
                    slightly damp firewood, absolute power resides solely with
                    the High Eight. These entities do not concern themselves
                    with the trivial annoyances of daily life; they hold the
                    keys to the fundamental, city-flattening forces of
                    existence. They function effectively as the cosmic Board of
                    Directors, squabbling over the budget of reality, while the
                    lesser gods are left to manage the petty cash of mortal
                    frustration. To ignore a minor spirit is merely bad luck; to
                    ignore one of the Eight is usually a geological event.
                </p>

                {showNinth && (
                    <div className="revealed">
                        <p style={{ fontWeight: "bold" }}>
                            Your insight grants you this extra information:
                        </p>
                        <p>
                            The universe governed only by these eight is a
                            terrifying place. It is vast, full of stuff crashing
                            together and exploding; all substance decays over
                            time, while desperate life tries to survive it all
                            before inevitability hitting succumbing to the great
                            nothingness.
                        </p>
                        <p>It is a loud, violent, churning chaos.</p>
                        <p>
                            What is missing is The Ninth. The force that is
                            currently hidden, yet dictates why Zareos burns at a
                            specific temperature, why Oriana pulls at a specific
                            mathematical rate, and why atoms form stable
                            structures instead of just chaotic soup. The domain
                            of Logic, Order, and Physical Law is currently
                            vacant in the eyes of mortals, a deity absent for
                            recorded history; only the gods know what has become
                            of them.
                        </p>
                    </div>
                )}

                <div>
                    <ChromaGrid
                        items={godTiles}
                        columns={showNinth ? 3 : 4}
                        rows={showNinth ? 3 : 2}
                        radius={150}
                    />
                </div>

                <h2>The lower pantheon</h2>
                <p>
                    Beneath the crushing weight of the High Eight lies the
                    shifting sea of the Lower Pantheon. These are not the
                    architects of reality, but its scavengers and interpreters,
                    ephemeral deities born from the friction between cosmic
                    forces and the collective psyche of mortals. They are as
                    fluid as the cultures that worship them, manifesting to
                    govern specific trades, local phenomena, or fleeting
                    societal obsessions. While the forces of the upper pantheon
                    are eternal and indifferent, these lesser spirits are
                    intimate, petty, and constantly evolving; birthing new
                    divinities as technology advances and starving old ones into
                    oblivion as traditions fade. They are the gods of the
                    specific, the patrons of the niche, and the keepers of the
                    mundane.
                </p>
                <p>
                    A selection of the most worshipped, and afeared, lesser gods
                    & spirits is detailed below.
                </p>
                <ul>
                    <li>
                        <b>Oopsidas, The Handyman: </b>The Patron God of "I Can
                        Definitely Fix That Myself Without Calling A
                        Professional." His sacred symbols are a stripped screw,
                        a rounded-off Allen key, and a small pile of
                        vital-looking components left over after reassembling an
                        appliance. He is worshipped primarily through the act of
                        swearing loudly while bleeding from a minor knuckle
                        scrape.
                    </li>
                    <li>
                        <b>Haesit, The Imp of the Stuttered Incantation: </b>The
                        spirit responsible for that moment when a Wizard forgets
                        the final syllable of a fireball spell while an Orc is
                        charging at them. He feeds on the panic of magic users
                        flipping frantically through their spellbooks. Bards
                        also offer him quiet prayers hoping they don't forget
                        the third verse of "The Lusty Bar Wench" in front of the
                        King.
                    </li>
                    <li>
                        <b>Bladderach, The Cold Stone Floor: </b>The God of
                        Waking Up in the Inn at 3:00 AM. He is the master of the
                        freezing cold draft and the elusive chamber pot. He
                        ensures that the floorboards are always at their coldest
                        and squeakiest when you are trying not to wake the rest
                        of the adventuring party.
                    </li>
                    <li>
                        <b>Clang, The Unstealthy: </b>The nemesis of Rogues
                        everywhere. Clang is the spirit that manifests as a
                        sudden, loud sneeze when hiding in a closet, or the
                        sound of a heavy suit of armor tripping over a singular
                        copper coin in a silent crypt. He is worshipped by
                        dungeon monsters who enjoy a delivered meal.
                    </li>
                    <li>
                        <b>Anoia, Keeper of the Stuck Drawer: </b>The Goddess of
                        ladles that prevent the kitchen drawer from opening. In
                        this era, she also governs swords that get stuck in
                        scabbards at the start of a duel and visors that slam
                        shut and refuse to open just as the knight is trying to
                        say something heroic.
                    </li>
                    <li>
                        <b>Locata, The Retriever: </b>The Goddess of "I Swear It
                        Went Into This Bush." She is worshipped primarily by
                        Archers and knife-throwers who are trying to recover
                        their ammunition after a battle. A prayer to Locata
                        increases the chances that your expensive Elven arrow
                        didn't snap against a rock, but is instead resting
                        visibly in a patch of moss.
                    </li>
                    <li>
                        <b>Crispin, The Lord of the Golden Crust: </b>The God of
                        Tavern Food That Doesn't Give You Food Poisoning. He
                        ensures the meat is cooked through, the bread is warm,
                        and the cheese is free of mold. He is the enemy of
                        mystery stews and the champion of the crispy potato.
                    </li>
                    <li>
                        <b>Kindlor, The Spark: </b>The God of "Lighting the
                        Campfire on the First Try." He is invoked by Rangers in
                        pouring rain and windswept caves. When the tinder
                        catches immediately despite the damp wood, it is Kindle
                        blowing on the embers.
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default GodsPage;
