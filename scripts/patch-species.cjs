const fs = require('fs');
let code = fs.readFileSync('src/data/speciesData.ts', 'utf8');

// Update interface
code = code.replace(
  /image: string \| null;\n\}/,
  'identificationTips?: string;\n  localLaws?: string;\n  image: string | null;\n}'
);

const tipsAndLaws = {
  'Fer-de-lance': { tips: 'Look for the distinct X-shaped or hourglass geometric patterns on the back, a highly triangular head wider than the neck, and a heat-sensing pit between eye and nostril.', laws: 'Not legally protected, but killing is generally discouraged unless in direct self-defense. Local custom often dictates killing on sight due to danger.' },
  'Coral Snake': { tips: 'Remember: "Red touches yellow, kills a fellow" (in North/Central America). True coral snakes have bands that completely encircle the body, with black snouts.', laws: 'Protected under Honduran wildlife laws. Killing is illegal but often overlooked in remote areas if it poses an immediate threat.' },
  'Bushmaster': { tips: 'Huge size (up to 3m), reddish-brown with dark diamond/rhombus patterns. Heavily keeled (rough) scales. Silent; has no rattle.', laws: 'Protected species. Extremely rare. Killing is strictly prohibited by conservation laws.' },
  'Jumping Viper': { tips: 'Extremely stout, thick body for its length. Heavily keeled scales. Head is very distinct from the narrow neck. Tends to strike forcefully.', laws: 'Regulated under general wildlife protection. Do not kill unless in imminent danger.' },
  'Yellow-Jawed Tommigoff': { tips: 'Stout brown/gray body with a distinct yellowish lower jaw and chin. Terrestrial and well-camouflaged in leaf litter.', laws: 'General wildlife protection applies.' },
  'Hognose Pit Viper': { tips: 'Small size, highly upturned "snout" (rostral scale). Usually found in leaf litter. Dark brown blotches on a lighter brown background.', laws: 'General wildlife protection.' },
  'Rattlesnake': { tips: 'Distinctive rattle on the tail (unless broken). Diamond-like pattern on the back. Two light stripes on the side of the face.', laws: 'Often killed on sight by locals, but legally protected. Avoid and retreat.' },
  'Iguana': { tips: 'Large dewlap under the neck, a row of spines down the back to the tail, and prominent subtympanic shield (large scale) on the cheek.', laws: 'Hunting is seasonally regulated. Illegal to hunt during breeding season (typically Feb-April). Heavily protected in certain reserves.' },
  'Black Iguana': { tips: 'Darker, often black or grayish with dark bands. Lacks the large circular cheek scale of the green iguana. Tail has heavy, whorled spiny scales.', laws: 'Similar regulations to Green Iguanas. Seasonal hunting restrictions apply.' },
  'Centipede': { tips: 'Flattened body with one pair of legs per body segment. Moves very quickly. Large venomous forcipules (pincers) under the head.', laws: 'No protection laws. Kill or avoid as necessary.' },
  'Bullet Ant': { tips: 'Very large ant (up to 1.2 inches). Reddish-black. Found individually or in small foraging columns, often on tree trunks.', laws: 'No specific protection.' },
  'Tarantula': { tips: 'Large, hairy spiders. Many local species have red or orange "knees" or abdomens. Generally slow-moving unless provoked.', laws: 'Export is heavily regulated (CITES). Local killing is not illegal but unnecessary as they are highly beneficial.' },
  'Wandering Spider': { tips: 'Large, brown/gray, highly aggressive posture when threatened (rears up on hind legs, showing red fangs). Often hides in banana clusters or dark crevices.', laws: 'No protection.' },
  'Scorpion': { tips: 'Pincers at the front, segmented tail curving over the back ending in a stinger. Bark scorpions are often slender and light brown/yellow.', laws: 'No protection.' },
  'Kissing Bug': { tips: 'Cone-shaped head, dark brown/black flat body often with orange/red stripes around the edge of the abdomen.', laws: 'Public health menace. Kill on sight.' },
  'Mosquito': { tips: 'Aedes (dengue) has white stripes on legs. Anopheles (malaria) rests with its abdomen pointing upward at an angle.', laws: 'Public health menace. Vector control protocols encourage eradication.' },
  'Botfly': { tips: 'Adult fly resembles a small bumblebee. The larvae present as a painful, raised, red boil on the skin with a visible central breathing pore.', laws: 'None.' },
  'Sand Flea': { tips: 'Microscopic. Infestation appears as a small black dot under the skin (usually on feet/toes) that swells into a painful white pea-sized nodule.', laws: 'None.' },
  'Army Ants': { tips: 'Travel in massive, dense, fast-moving columns on the forest floor. They do not build permanent nests.', laws: 'None.' },
  'Dieffenbachia': { tips: 'Large, broad, fleshy leaves, often variegated with white or yellow spots/stripes. Stem is thick and cane-like.', laws: 'None. Common ornamental but deadly if ingested.' },
  'Manchineel': { tips: 'Tree with shiny green leaves. Produces small, greenish-yellow apple-like fruits. Sap is milky white and highly caustic.', laws: 'Do not burn the wood (smoke causes blindness). Cutting down is discouraged without extreme protective gear.' },
  'Apocynaceae': { tips: 'Trees/shrubs with milky latex sap when broken. Leaves are often opposite or whorled. Flowers are tubular with 5 lobes.', laws: 'None.' },
  'Castor Bean': { tips: 'Large, star-shaped (palmate) leaves. Seed pods are spiky/prickly and contain mottled, tick-like seeds.', laws: 'None. Highly invasive in some areas.' },
  'Oleander': { tips: 'Shrub with long, narrow, dark green leaves. Flowers are pink, red, or white in clusters. Highly toxic.', laws: 'None.' },
  'Datura': { tips: 'Trumpet-shaped white or purple flowers. Seed pods are round and covered in sharp spines (thornapples). Leaves have a foul odor when crushed.', laws: 'None.' },
  'Physic Nut': { tips: 'Shrub with lobed leaves. Produces green to yellow fruit capsules containing three toxic black seeds.', laws: 'None.' },
  'Sandbox Tree': { tips: 'Trunk is heavily covered in sharp, dark, conical spines. Fruit looks like a small pumpkin that explodes violently when dry.', laws: 'None.' },
  'Spurge': { tips: 'Weeds or shrubs that exude a toxic milky white sap when a stem or leaf is broken.', laws: 'None.' },
  'Cockspur': { tips: 'Tree with thorny branches and brilliant red, curved, claw-like flowers. Seeds are bright red and highly toxic.', laws: 'None.' },
  'Maya Nut': { tips: 'Large canopy tree. Leaves are simple, alternate, with milky sap. Fruit is small, round, containing a highly nutritious brown seed.', laws: 'Protected in conservation areas. Harvesting fallen nuts is legal and encouraged.' },
  'Soursop': { tips: 'Small tree. Fruit is large, dark green, heart-shaped, and covered in soft, fleshy spines. White fibrous flesh inside.', laws: 'Cultivated crop. Harvesting from private property requires permission.' },
  'Avocado': { tips: 'Medium tree. Leaves are elliptic and glossy. Fruit has a thick, dark green/black leathery skin and large central pit.', laws: 'Often cultivated. Wild foraging is fine on public land.' },
  'Guava': { tips: 'Small tree with smooth, peeling, copper-colored bark. Opposite leaves. Fruit is round/oval, turning yellow when ripe, with pink or white flesh and many small seeds.', laws: 'None. Widespread and common.' },
  'Coconut Palm': { tips: 'Tall palm with a smooth, leaning trunk and a crown of large pinnate leaves. Large, hard-shelled fruits at the base of the leaves.', laws: 'Falling coconuts are a hazard. Usually found on private property along coasts; ask before taking.' },
  'Papaya': { tips: 'Unbranched, soft-wooded tree with a crown of deeply lobed leaves. Fruits grow directly from the upper trunk.', laws: 'Cultivated. Do not forage from private farms.' },
  'Heart of Palm': { tips: 'Spiny palm tree (Pejibaye). Trunk is covered in bands of sharp, dark needles. Harvest requires killing the stem to extract the inner core.', laws: 'Harvesting wild palms may be restricted in reserves. Commercial cultivation is common.' },
  'Banana': { tips: 'Large herbaceous plant (not a true tree) with massive, tearing leaves. Fruit grows in large hanging bunches pointing upward.', laws: 'Almost exclusively cultivated. Do not take from plantations (fincas) as this is considered theft.' },
  'Mango': { tips: 'Large canopy tree with dense, dark green foliage. Leaves are lance-shaped. Fruit hangs on long stems.', laws: 'Very common. Foraging fallen fruit is generally accepted, but ask if near a home.' },
  'Starfruit': { tips: 'Small tree. Leaves are compound. Fruit is uniquely star-shaped when cut in cross-section, turning bright yellow when ripe.', laws: 'Cultivated. Ask permission.' },
  'Cashew': { tips: 'Sprawling tree. Fruit is a yellow/red fleshy "apple" with the actual nut hanging outside at the bottom in a toxic, kidney-shaped shell.', laws: 'DO NOT crack the raw nut shell with your teeth or bare hands (contains caustic oil similar to poison ivy).' },
  'Guaba': { tips: 'Tree with compound leaves. Fruit is a long, thick, green/brown pod containing black seeds covered in sweet, white, cottony pulp.', laws: 'Common in agroforestry (used to shade coffee). Ask permission on farms.' },
  'Passion Fruit': { tips: 'Climbing vine with curling tendrils. Elaborate, complex purple/white flowers. Fruit is round, turning purple or yellow when ripe, with jelly-like seed pulp.', laws: 'None.' },
  'Pineapple': { tips: 'Ground-dwelling bromeliad. Long, stiff, spiky leaves forming a rosette. Fruit grows from the center.', laws: 'Cultivated. Taking from fields is illegal.' },
  'Nance': { tips: 'Small, drought-tolerant tree. Produces thousands of small, round, strongly-scented yellow fruits (resembling yellow cherries).', laws: 'Wild foraging is highly common and legal.' },
  'Zapote': { tips: 'Large tree. Fruit has rough, scruffy brown skin. Flesh is sweet, brownish-red, with smooth black seeds.', laws: 'Foraging fallen fruit is legal.' },
  'Mamey Sapote': { tips: 'Very large tree. Fruit is football-shaped with sandpaper-like skin. Flesh is vibrant orange/red.', laws: 'Foraging fallen fruit is legal.' },
  'Agouti': { tips: 'Large rodent (size of a rabbit). Coarse, reddish-brown hair. Humped back and very short tail. Runs quickly on long legs.', laws: 'Hunting is regulated by local quotas. Often hunted for bushmeat.' },
  'Paca': { tips: 'Large, stout rodent. Dark brown with rows of white spots/stripes along its sides. Nocturnal and usually found near water.', laws: 'Highly prized for meat. Hunting is heavily regulated due to overhunting.' },
  'White-tailed Deer': { tips: 'Medium-sized deer. Reddish-brown coat. Tail is brown above, white below (raised when alarmed).', laws: 'Hunting requires permits and strictly adheres to hunting seasons. Poaching is illegal.' },
  'Collared Peccary': { tips: 'Looks like a small, dark, bristly wild pig. Distinctive white/yellowish band (collar) around the neck/shoulders. Very strong musky smell.', laws: 'Regulated hunting species. Check local season laws.' },
  'Armadillo': { tips: 'Armored shell consisting of bony plates covered in leathery skin. Pointed snout and long, scaly tail.', laws: 'Hunting for bushmeat is common but regulated in conservation zones.' },
  'Howler Monkey': { tips: 'Large, stocky monkey. Mostly black with a mantle of golden-brown hair on the sides. Very loud, guttural roars heard for miles.', laws: 'Strictly protected species. Hunting, capturing, or killing is a severe federal offense.' },
  'White-faced Monkey': { tips: 'Medium monkey. Black body with a distinctive white face, throat, and chest. Highly active and intelligent.', laws: 'Strictly protected. Feeding them is also illegal in many national parks.' },
  'Green Turtle': { tips: 'Large sea turtle. Smooth, teardrop-shaped carapace (shell). Scales do not overlap. Single pair of prefrontal scales on the head.', laws: 'CRITICALLY PROTECTED. Killing, harvesting eggs, or possessing turtle products is a major federal crime.' },
  'Hickatee': { tips: 'Large freshwater turtle. Dark, smooth, flattened shell. Small head with a slightly projecting snout. Fully aquatic.', laws: 'Endangered and strictly protected. Harvesting is illegal.' },
  'Common Snook': { tips: 'Sleek, silver fish with a very prominent, dark, horizontal lateral line running the length of its body. Sloping forehead.', laws: 'Regulated by size and bag limits. Seasonal closures may apply.' },
  'Mojarras': { tips: 'Small to medium, deep-bodied, silvery fish. Often seen schooling in coastal and brackish waters.', laws: 'Generally unregulated for personal consumption.' },
  'Tilapia': { tips: 'Deep-bodied fish. Often grayish with vertical barring. Long dorsal fin.', laws: 'Invasive species. Unlimited fishing is usually encouraged.' },
  'Guapote': { tips: 'Large cichlid. Heavy, robust body with a large mouth and protruding lower jaw. Often heavily spotted or mottled (Jaguar cichlid).', laws: 'Regulated in some lakes, but generally open to fishing.' },
  'Tarpon': { tips: 'Massive, silver fish with huge, heavy scales. Upturned mouth. Last ray of the dorsal fin is elongated into a long filament.', laws: 'Catch and release only in many areas. Highly prized sport fish.' },
  'Crab': { tips: 'Flattened body with a hard shell. Ten legs, front pair modified into claws. Blue crabs have bright blue claws and paddle-like rear legs.', laws: 'Size limits apply. Taking females with egg sponges is illegal.' },
  'Shrimp': { tips: 'Translucent, elongated body with a tail fan. Long antennae.', laws: 'Cast netting is regulated. Commercial trawling has strict seasons.' },
  'Conch': { tips: 'Large, heavy marine snail with a massive, flared, pink-lipped spiral shell.', laws: 'Heavily regulated. Strict seasonal closures and size limits (must have a flared lip). Export is CITES controlled.' },
  'Curassow': { tips: 'Large, turkey-like forest bird. Males are black with a white belly and a prominent curly crest and yellow knob on the bill. Females are barred reddish-brown.', laws: 'Protected in most areas. Hunting is illegal due to declining populations.' },
  'Guinea Fowl': { tips: 'Plump, chicken-sized bird. Dark gray/black plumage heavily spotted with white. Bare head with a bony casque (helmet) on top.', laws: 'Considered semi-domesticated livestock. Do not shoot unless genuinely wild or with permission.' },
  'Wild Turkey': { tips: 'Ocellated turkey has spectacular iridescent feathers (bronze, green, blue) and tail feathers with blue/bronze eye-spots (ocelli). Bare blue head with orange/red nodules.', laws: 'Protected and heavily regulated. Hunting is restricted to specific tags and seasons.' },
  'Pigeon': { tips: 'Plump birds with small heads and short legs. Smooth, dense plumage. Fast flyers.', laws: 'Hunting certain species (like White-crowned Pigeon) is regulated by season.' },
  'Parrot': { tips: 'Brightly colored (often green), stocky birds with strong, curved beaks and zygodactyl feet (two toes forward, two back).', laws: 'ALL native parrots and macaws are strictly protected. Hunting or capturing for the pet trade is a federal crime.' },
  'Woodpecker': { tips: 'Clinging vertically to tree trunks. Stiff tail feathers for propping. Straight, chisel-like bill. Often have red markings on the head.', laws: 'Protected non-game bird. Illegal to hunt.' },
  'Cone-Nose Bug': { tips: 'Looks nearly identical to kissing bug; elongated head with prominent cone shape.', laws: 'Public health menace.' }
};

let modified = code;
for (const [key, data] of Object.entries(tipsAndLaws)) {
   const blockRegex = new RegExp(`name: '[^']*${key}[^']*',[\\s\\S]*?image: '[^']+'`, 'g');
   modified = modified.replace(blockRegex, (match) => {
      // Avoid double-injecting if we run this multiple times
      if (match.includes('identificationTips:')) return match;
      return match.replace(/image: '/, `identificationTips: ` + JSON.stringify(data.tips) + `,\n    localLaws: ` + JSON.stringify(data.laws) + `,\n    image: '`);
   });
}

fs.writeFileSync('src/data/speciesData.ts', modified);
console.log('Successfully patched speciesData.ts');
