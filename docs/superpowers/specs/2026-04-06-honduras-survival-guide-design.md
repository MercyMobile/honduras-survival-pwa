# Honduras Survival Guide - Design Specification

**Date:** April 6, 2026  
**Version:** 1.0  
**Status:** Approved

---

## 1. Overview

### 1.1 Purpose
A comprehensive, offline-first survival guide Progressive Web Application (PWA) for homeschooling Christian families operating in Honduras. The app provides actionable, instructional content for surviving in wilderness and emergency scenarios.

### 1.2 Target Scenarios
- Getting lost or disoriented in rural Honduras
- Emergency evacuation from dangerous situations
- Planned wilderness camping or mission trips
- Natural disaster response (hurricanes, floods, landslides)

### 1.3 Target Users
- Adult heads of household making survival decisions
- Christian families with homeschooling background
- Missionaries operating in remote areas
- Users with limited or no internet connectivity

### 1.4 Platform Requirements
- Mobile-first responsive design (phones primary, tablets secondary)
- Full offline functionality via PWA service worker
- Bilingual: English and Spanish with toggle
- Minimal storage footprint (<50MB with images)

---

## 2. Information Architecture

### 2.1 Navigation Structure
Reorganize from current topic-based tabs to survival-priority tabs:

| Tab | Icon | Priority |
|-----|------|----------|
| Water | Droplet | 1 |
| Shelter | Home/Tent | 2 |
| Fire | Flame | 3 |
| Food | Utensils/Leaf | 4 |
| First Aid | Heart/Cross | 5 |
| Navigation | Compass | 6 |
| Signaling | Radio/Flag | 7 |

### 2.2 Content Hierarchy
```
App
├── Water
│   ├── Finding Water (checklist)
│   ├── Purification Methods (step-by-step)
│   ├── Storage (tips)
│   └── Water Sources in Honduras (reference)
├── Shelter
│   ├── Site Selection (checklist)
│   ├── Elevated Platform Build (diagram + steps)
│   ├── Rain Protection (steps)
│   └── Hazard Avoidance (reference)
├── Fire
│   ├── Tinder Collection (checklist)
│   ├── Fire Starting Methods (steps)
│   ├── Maintaining in Humidity (tips)
│   └── Fire Safety (warnings)
├── Food
│   ├── Edible Plants (photos + ID)
│   ├── Toxic Plants (photos + warnings)
│   ├── Foraging Guidelines (checklist)
│   └── Food Preparation (steps)
├── First Aid
│   ├── Snake Bite Protocol (emergency steps)
│   ├── Wound Care (steps)
│   ├── Tropical Illnesses (reference)
│   └── Emergency Med Kit (checklist)
├── Navigation
│   ├── Compass Basics (steps)
│   ├── Landmark Navigation (tips)
│   ├── Water Route Strategy (reference)
│   └── Trail Marking (steps)
└── Signaling
    ├── Signal Mirror (steps)
    ├── Smoke Signals (diagram)
    ├── Audible Signals (tips)
    └── Rescue Patterns (reference)
```

---

## 3. Content Format Specifications

### 3.1 Checklist Format
Used for: Quick reference, preparation, verification steps

**Structure:**
- Title (action-oriented)
- 5-10 bullet points max
- Checkbox for each item (interactive, persisted)
- Critical items marked with ⚠️ warning icon

**Example:**
```
## Finding Water - Checklist

☐ Look for animal trails converging (animals need water daily)
☐ Search valley bottoms and ravines
☐ Listen for running water (stop and listen 2 min)
☐ Watch for insect swarms (indicates nearby water)
☐ Check for green vegetation in dry areas
☐ Dig in dry stream beds (water may be below surface)
⚠️ Avoid water near mining areas or agricultural runoff
```

### 3.2 Step-by-Step Format
Used for: Procedures that must be performed in sequence

**Structure:**
- Title (action-oriented)
- Estimated time
- Materials needed
- Numbered steps (1, 2, 3...)
- Warning callouts where applicable
- Biblical principle box (optional)

**Example:**
```
## Build a Bamboo Water Filter

**Time:** 20 minutes  
**Materials:** Bamboo stalk, cloth, charcoal, sand, grass

1. Cut bamboo section (30cm long, one node intact at bottom)
2. Punch small holes through the node for drainage
3. Layer inside (bottom to top):
   - Grass (2cm) - coarse filter
   - Charcoal crushed (5cm) - chemical filtration
   - Sand (5cm) - fine filtration
   - Cloth (top) - debris screen
4. Pour water slowly through top
5. Collect filtered water from bottom
6. ⚠️ ALWAYS boil or chemically treat after filtering

> **Proverbs 14:15** - "The prudent give thought to their steps."
> Filtration is the first step; purification is essential.
```

### 3.3 Reference Format
Used for: Identification guides, background information

**Structure:**
- Title
- Photo or SVG diagram
- Key identification features (bullets)
- Habitat/where found
- Danger level or safety notes

### 3.4 Biblical Decision Framework Integration

Each major section includes one biblical principle framed as a decision heuristic:

| Topic | Biblical Principle | Application |
|-------|-------------------|-------------|
| Water | "Test the spirits" (1 John 4:1) | Always test/treat water before drinking |
| Shelter | "House on the rock" (Matt 7:24-27) | Choose stable ground, avoid flood zones |
| Fire | "Iron sharpens iron" (Prov 27:17) | Work together to maintain fire |
| Food | "Be wise as serpents" (Matt 10:16) | When in doubt, don't eat it |
| First Aid | "Bear one another's burdens" (Gal 6:2) | Assign care roles in group |
| Navigation | "Count the cost" (Luke 14:28) | Plan route before departing |
| Signaling | "Light on a hill" (Matt 5:14) | Make yourself visible |

---

## 4. Visual Design Specifications

### 4.1 SVG Diagrams
Used for: Instructional sequences, shelter construction, fire layouts, signaling techniques

**Style:**
- Clean line art, high contrast
- Minimal colors (black, white, accent color)
- Annotated with labels
- Scalable for any screen size

**Examples needed:**
- Elevated shelter platform construction (4 views)
- Fire lay structures (teepee, log cabin, star)
- Signal mirror technique
- Compass bearing navigation

### 4.2 Photography
Used for: Plant identification, animal identification, hazard recognition

**Requirements:**
- Compressed JPEG/WebP format
- Max 200KB per image
- Alt text for accessibility
- Fallback to SVG if image fails to load

**Subjects needed:**
- Edible plants: Avocado, Maya Nut, Guava, Soursop
- Toxic plants: Dieffenbachia, Apocynaceae, Manchineel
- Dangerous animals: Fer-de-lance, Coral Snake
- Shelter examples, fire examples

### 4.3 Iconography
- Use Lucide React icons (already in project)
- Consistent sizing (20px for UI, 24px for headers)
- Color-coded by category:
  - Water: Blue
  - Shelter: Brown
  - Fire: Orange/Red
  - Food: Green
  - First Aid: Red
  - Navigation: Purple
  - Signaling: Yellow

---

## 5. Technical Architecture

### 5.1 Data Model

```typescript
interface SurvivalTopic {
  id: string;
  category: 'water' | 'shelter' | 'fire' | 'food' | 'first-aid' | 'navigation' | 'signaling';
  title: { en: string; es: string };
  type: 'checklist' | 'steps' | 'reference';
  content: {
    en: TopicContent;
    es: TopicContent;
  };
  images?: string[];
  diagrams?: string[];
  biblicalPrinciple?: BiblicalPrinciple;
}

interface ChecklistItem {
  text: { en: string; es: string };
  critical?: boolean;
}

interface Step {
  text: { en: string; es: string };
  warning?: { en: string; es: string };
}

interface TopicContent {
  checklist?: ChecklistItem[];
  steps?: Step[];
  materials?: { en: string; es: string }[];
  estimatedTime?: string;
  reference?: string;
}

interface BiblicalPrinciple {
  verse: string;
  text: { en: string; es: string };
  application: { en: string; es: string };
}

interface UserProgress {
  completedChecklists: string[]; // topic IDs
  lastUpdated: number;
}
```

### 5.2 State Management
- React Context for language selection (en/es)
- localStorage for checklist progress persistence
- No server dependencies - fully offline

### 5.3 PWA Configuration
- Service worker: Cache-first for all assets
- Manifest: Installable, standalone mode
- Offline fallback: All content available without network
- Update strategy: Auto-update on network availability

### 5.4 Performance Targets
- First contentful paint: <2s on 3G
- Time to interactive: <3s on 3G
- Total bundle size: <50MB including images
- Lighthouse PWA score: 100

---

## 6. Component Architecture

### 6.1 New Components

| Component | Purpose | Props |
|-----------|---------|-------|
| `SurvivalTab` | Container for each survival priority tab | `category`, `topics` |
| `ChecklistCard` | Interactive checklist with checkboxes | `topic`, `onProgress` |
| `StepByStepCard` | Numbered step-by-step guide | `topic` |
| `ReferenceCard` | Photo/diagram with reference info | `topic` |
| `LanguageToggle` | English/Spanish switcher | `language`, `onToggle` |
| `BiblicalPrincipleBox` | Scripture + application callout | `principle` |
| `ImageWithFallback` | Image component with offline fallback | `src`, `alt`, `fallback` |
| `WarningCallout` | Visual warning indicator | `message` |

### 6.2 Modified Components

| Component | Change |
|-----------|--------|
| `App.tsx` | Replace current tabs with survival priority tabs |
| `SpeciesDatabase.tsx` | Move to Food tab subsection (plant ID) |
| `MapReader.tsx` | Move to Navigation tab subsection |
| `SurvivalManual.tsx` | Deprecate - content redistributed to new structure |
| `LanguageTools.tsx` | Repurpose or remove |

### 6.3 Data Files

| File | Content |
|------|---------|
| `src/data/water.ts` | Water topic definitions (bilingual) |
| `src/data/shelter.ts` | Shelter topic definitions |
| `src/data/fire.ts` | Fire topic definitions |
| `src/data/food.ts` | Food topic definitions |
| `src/data/firstAid.ts` | First aid topic definitions |
| `src/data/navigation.ts` | Navigation topic definitions |
| `src/data/signaling.ts` | Signaling topic definitions |
| `src/data/biblicalPrinciples.ts` | Shared biblical principles |

---

## 7. Bilingual Implementation

### 7.1 Language Toggle
- Persistent selection (localStorage)
- Accessible from every screen (header)
- Instant switch without reload

### 7.2 Content Strategy
- All user-facing text in both languages
- Data files contain `{ en, es }` objects
- No runtime translation - all content pre-translated

### 7.3 Translation Keys
Use nested key structure for organization:
```json
{
  "water": {
    "title": "Water",
    "findingWater": {
      "title": "Finding Water",
      "items": [...]
    }
  }
}
```

---

## 8. Checklist Persistence

### 8.1 Storage Mechanism
- localStorage key: `survival-progress`
- Data structure:
```json
{
  "completedChecklists": ["water-finding-1", "shelter-platform-2"],
  "lastUpdated": 1712448000000
}
```

### 8.2 User Feedback
- Visual indicator on completed items
- Progress summary per category
- Reset option (clear all progress)

---

## 9. Error Handling

### 9.1 Offline Scenarios
- All content cached on first load
- Service worker intercepts all requests
- Fallback to placeholder if asset missing

### 9.2 Image Failures
- `onError` handler switches to SVG placeholder
- Alt text always present
- No broken image icons

### 9.3 Data Corruption
- Try/catch on localStorage read
- Reset to defaults if corrupted
- User warned if progress lost

---

## 10. Testing Strategy

### 10.1 Manual Test Scenarios
1. **Offline Mode:** Disable network, verify all content loads
2. **Language Switch:** Toggle EN/ES, verify all text updates
3. **Checklist Persistence:** Complete items, reload, verify saved
4. **Image Fallback:** Break image URL, verify placeholder shows
5. **Install PWA:** Add to home screen, verify standalone mode

### 10.2 Automated Tests (Future)
- Unit tests for data structure validation
- Component tests for checklist interactions
- E2E test for language toggle flow

---

## 11. Rollout Plan

### Phase 1: Foundation (Current)
- [x] PWA configuration
- [x] Basic component structure
- [ ] Data model implementation
- [ ] Language toggle infrastructure

### Phase 2: Content Migration
- [ ] Water content (checklists + steps)
- [ ] Shelter content (diagrams + steps)
- [ ] Fire content (checklists + steps)
- [ ] Food content (plant ID + foraging)
- [ ] First Aid content (protocols)
- [ ] Navigation content (compass + maps)
- [ ] Signaling content (techniques)

### Phase 3: Polish
- [ ] SVG diagrams creation
- [ ] Photo integration
- [ ] Biblical principles integration
- [ ] Bilingual content completion
- [ ] Performance optimization

### Phase 4: Validation
- [ ] Offline testing
- [ ] User testing with target families
- [ ] Accessibility audit
- [ ] Lighthouse optimization

---

## 12. Success Criteria

### Functional
- All 7 survival categories fully populated
- Every topic available in English and Spanish
- All checklists interactive and persisting
- Full offline functionality verified

### Performance
- Lighthouse PWA score: 100
- Bundle size <50MB
- Loads in <3s on 3G connection

### Usability
- User can find water purification steps in <15s
- User can complete a checklist and see progress saved
- User can switch languages instantly
- User can install as PWA and use offline

---

## 13. Open Questions

None - all design decisions resolved through brainstorming session.

---

## Appendix A: Sample Content - Water Category

### Finding Water (Checklist)

**English:**
- ☐ Look for animal trails converging
- ☐ Search valley bottoms and ravines
- ☐ Listen for running water (stop 2 minutes)
- ☐ Watch for insect swarms
- ☐ Check for green vegetation in dry areas
- ☐ Dig in dry stream beds
- ⚠️ Avoid water near mining or agriculture

**Spanish:**
- ☐ Busque senderos de animales que convergen
- ☐ Busque en el fondo de valles y quebradas
- ☐ Escuche agua corriendo (pare 2 minutos)
- ☐ Observe enjambres de insectos
- ☐ Busque vegetación verde en áreas secas
- ☐ Cave en lechos de arroyos secos
- ⚠️ Evite agua cerca de minería o agricultura

**Biblical Principle:**
> Proverbs 14:15 - "The prudent give thought to their steps."
> Always verify water safety before consumption.

---

*End of Specification Document*
