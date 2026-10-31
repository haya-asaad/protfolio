import os
import urllib.request
from concurrent.futures import ThreadPoolExecutor

# Exact mapping of project and sub-project cover images from https://www.haya-assad.com/
COVERS = [
    # 1. na-project-complex
    ("public/images/projects/na-project-complex", "4d6973_7e2d1d529166407f952e458a433b1ab6~mv2.jpg"),

    # 2. final-project-dahmash + 13 sub-galleries
    ("public/images/projects/final-project-dahmash", "4d6973_55e593758aa0465eab26346d3f665d33~mv2.jpg"),
    ("public/images/projects/final-project-dahmash/education-and-religion-exterior", "4d6973_4703a9f7e5294ded81252b1cffe85e8b~mv2.jpg"),
    ("public/images/projects/final-project-dahmash/education-and-religion-interior", "4d6973_cb9a06b0f9f649f6969e7cce59c34d14~mv2.jpg"),
    ("public/images/projects/final-project-dahmash/education-and-religion-section", "4d6973_96dff87dc1134a269259f7612c998168~mv2.jpg"),
    ("public/images/projects/final-project-dahmash/education-and-religion-3d-2d-plans", "4d6973_153c17f210c846e689a15b500ddb60f9~mv2.jpg"),
    ("public/images/projects/final-project-dahmash/details", "4d6973_3140d66c342e4b0bb0ac7999b7e647ff~mv2.jpg"),
    ("public/images/projects/final-project-dahmash/collages", "4d6973_59d491c1e0f744f29698426cd75d8ce2~mv2.jpg"),
    ("public/images/projects/final-project-dahmash/general-analysis-map-of-the-area", "4d6973_8089ee00be7c4e07bdebf97b9822c839~mv2.jpg"),
    ("public/images/projects/final-project-dahmash/intervention-in-particular-the-walls-barriers", "4d6973_a1f7aea8af35468aa0d97a603f284eac~mv2.jpg"),
    ("public/images/projects/final-project-dahmash/maps-and-urban", "4d6973_bad7f04f275b4e6aa263efa54fa2d513~mv2.jpg"),
    ("public/images/projects/final-project-dahmash/concept-models", "4d6973_6cdd230a27d746498eadb1fefd7cc62b~mv2.jpg"),
    ("public/images/projects/final-project-dahmash/village-analysis-map", "4d6973_e9de8482867d4f7f89756b8e689283a6~mv2.jpg"),
    ("public/images/projects/final-project-dahmash/3d-models", "4d6973_336d4fae38134900850a661109b9059d~mv2.jpg"),
    ("public/images/projects/final-project-dahmash/geometry-shapes", "4d6973_4c381d8631434014b17aca148eef805a~mv2.jpg"),

    # 3. housing-collective + 9 sub-galleries
    ("public/images/projects/housing-collective", "4d6973_045db10ef63645a092c02420f4796cea~mv2.jpg"),
    ("public/images/projects/housing-collective/simulations", "4d6973_0d1dcf0b12b744f59b2dc8229af16e21~mv2.jpg"),
    ("public/images/projects/housing-collective/simulation", "4d6973_161cbb516d2b4d07a683ccb7a08cc100~mv2.jpg"),
    ("public/images/projects/housing-collective/2d-plans-and-sections", "4d6973_5ed5b51ee5974e0a9f4e6908d45a6662~mv2.jpg"),
    ("public/images/projects/housing-collective/apartments", "4d6973_258b6bf2301948338ca84cfed6ec7ad8~mv2.jpg"),
    ("public/images/projects/housing-collective/sketches", "4d6973_d4f1e02cdce745068dbb956084488323~mv2.png"),
    ("public/images/projects/housing-collective/collages", "4d6973_5eac87507f114f128b86bb3823c469cc~mv2.jpg"),
    ("public/images/projects/housing-collective/3d-model", "4d6973_b68d9e6895594698a9f62943be35a834~mv2.jpg"),
    ("public/images/projects/housing-collective/concept-models", "4d6973_6fdb8031937f4b5a96473dd711195cbc~mv2.png"),
    ("public/images/projects/housing-collective/3d-schema", "4d6973_d966e0e786b1486ca676796cd331b4c3~mv2.jpg"),

    # 4. technology-tectonics + 10 sub-galleries
    ("public/images/projects/technology-tectonics", "4d6973_79cd225cd4a14499a174e7540d441245~mv2.jpeg"),
    ("public/images/projects/technology-tectonics/simulations", "4d6973_aaeaacbbc0f249edb6a4c300fe5337ca~mv2.jpg"),
    ("public/images/projects/technology-tectonics/about-the-project", "4d6973_e667898259ae43739880ab2811e0e79b~mv2.jpg"),
    ("public/images/projects/technology-tectonics/site-plan", "4d6973_405cd1ad57324dbcbad6e7e0d5914a8c~mv2.jpg"),
    ("public/images/projects/technology-tectonics/floor-plan-1-50", "4d6973_1ba10c188a2e46e4bd120d02ff6e131c~mv2.jpg"),
    ("public/images/projects/technology-tectonics/roof-plan", "4d6973_a1f535bae348478ea17f9da30e3e57f4~mv2.jpg"),
    ("public/images/projects/technology-tectonics/site-section", "4d6973_307fb6e650104542860a149bdade9f44~mv2.jpg"),
    ("public/images/projects/technology-tectonics/sections", "4d6973_ca7af3b086b04a4eab3bfb7c5037889d~mv2.jpg"),
    ("public/images/projects/technology-tectonics/facades", "4d6973_10abfc26ff4c4807b5cbd1072689e4f6~mv2.jpg"),
    ("public/images/projects/technology-tectonics/details", "4d6973_eda0a1b6e90047308d15b392b1948eb9~mv2.jpg"),
    ("public/images/projects/technology-tectonics/3d-models", "4d6973_4e409bba1a9246ee8ce06204f7e8ae40~mv2.jpg"),

    # 5. complex-challenges-slope
    ("public/images/projects/complex-challenges-slope", "4d6973_684578031a594588b156b67221454263~mv2.jpeg"),

    # 6. digital-studio-parametric + 2 sub-galleries
    ("public/images/projects/digital-studio-parametric", "4d6973_5522f32574d942bcb53733d89ca89be6~mv2.jpg"),
    ("public/images/projects/digital-studio-parametric/final-submission", "4d6973_750622fd44d04d4bb32f30958b230367~mv2.jpg"),
    ("public/images/projects/digital-studio-parametric/first-submission", "4d6973_88ccf215324b4bbd883d1ce652d5b625~mv2.jpg"),

    # 7. urban-studio-wadi + 4 sub-galleries
    ("public/images/projects/urban-studio-wadi", "4d6973_9a89a9c83968429796b31a0bbf195412~mv2.jpeg"),
    ("public/images/projects/urban-studio-wadi/ideology-development-with-a-process", "4d6973_1132a09b38b04a0390e0d1ee2c2c458a~mv2.jpg"),
    ("public/images/projects/urban-studio-wadi/model-and-schematics", "4d6973_fb2160875ba647e9b05e1ed5940cc94b~mv2.jpg"),
    ("public/images/projects/urban-studio-wadi/final-submission", "4d6973_aa6c162443a84f86b771e627125f0589~mv2.jpg"),
    ("public/images/projects/urban-studio-wadi/final-model", "4d6973_3b262cf9b04640078acbd9eab93b4b6c~mv2.jpg"),

    # 8. drawings-tectonic-sections
    ("public/images/projects/drawings-tectonic-sections", "4d6973_b41ec6a2cf504b089371736a18dbbed8~mv2.jpg"),

    # 9. small-community-inbetweav + 9 sub-galleries
    ("public/images/projects/small-community-inbetweav", "4d6973_3461551632854d099b0124b46f222652~mv2.jpg"),
    ("public/images/projects/small-community-inbetweav/artist-work", "4d6973_8de37b5b46334f3c8ddc9cc9fe1b96a7~mv2.jpg"),
    ("public/images/projects/small-community-inbetweav/2d-analysis", "4d6973_fb1d82639435406cac7a1ecbba56a833~mv2.jpg"),
    ("public/images/projects/small-community-inbetweav/conceptual-scheme-for-planning", "4d6973_4c7f6b17c2f04f4bb4fed7194bd79f51~mv2.jpg"),
    ("public/images/projects/small-community-inbetweav/concept-models", "4d6973_43badb96ff274fc6a9806e23ca4a1889~mv2.jpg"),
    ("public/images/projects/small-community-inbetweav/final-model", "4d6973_326a2a2b8a934a0698c5f82b7266be99~mv2.jpg"),
    ("public/images/projects/small-community-inbetweav/plans", "4d6973_a7a16da24963438d9d68e1d3f4130022~mv2.jpg"),
    ("public/images/projects/small-community-inbetweav/sections", "4d6973_d14ed923f1f3429eab74c69583daecd5~mv2.jpg"),
    ("public/images/projects/small-community-inbetweav/facades", "4d6973_98086218651249c68532aba5ae2c320c~mv2.jpg"),
    ("public/images/projects/small-community-inbetweav/perspective", "4d6973_64705910f71d4210b40711782683ea91~mv2.jpg"),

    # 10. sketches-ideation
    ("public/images/projects/sketches-ideation", "4d6973_6dae230417d34a0686662b32106af42a~mv2.jpg"),

    # 11. digital-draw-art
    ("public/images/projects/digital-draw-art", "4d6973_fdf51968769b450b93a8e7e8ac10bb1d~mv2.png"),
]


def is_placeholder(filepath):
    """Returns True if the file is one of the ~3.2KB generated placeholder PNGs."""
    if not os.path.exists(filepath):
        return True
    size = os.path.getsize(filepath)
    return size < 5000


def process_entry(entry):
    folder, media_id = entry
    os.makedirs(folder, exist_ok=True)

    # Check existing cover.* files in folder
    existing_covers = [
        f for f in os.listdir(folder)
        if f.lower().startswith("cover.") and os.path.isfile(os.path.join(folder, f))
    ]

    real_covers = [f for f in existing_covers if not is_placeholder(os.path.join(folder, f))]
    placeholder_covers = [f for f in existing_covers if is_placeholder(os.path.join(folder, f))]

    if real_covers:
        # Remove any leftover placeholder cover.* if a real cover.* exists
        for pc in placeholder_covers:
            os.remove(os.path.join(folder, pc))
        return f"SKIP (already has {real_covers[0]}): {folder}"

    # Download from static.wixstatic.com
    url = f"https://static.wixstatic.com/media/{media_id}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    data = urllib.request.urlopen(req, timeout=30).read()

    # Save as cover.jpg (replacing any placeholder)
    for pc in placeholder_covers:
        os.remove(os.path.join(folder, pc))

    ext = os.path.splitext(media_id)[1].lower() or ".jpg"
    target_path = os.path.join(folder, f"cover{ext}")
    with open(target_path, "wb") as f:
        f.write(data)

    return f"DOWNLOADED ({len(data)} bytes) -> {target_path}"


def main():
    with ThreadPoolExecutor(max_workers=8) as pool:
        results = list(pool.map(process_entry, COVERS))
    for r in results:
        print(r)


if __name__ == "__main__":
    main()

