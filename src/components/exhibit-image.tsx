import Image from "next/image";
import type { ImageAsset } from "@/lib/types";

export function ExhibitImage({
  image,
  caption,
  sizes = "(max-width: 760px) 100vw, 50vw",
}: {
  image: ImageAsset;
  caption: string;
  sizes?: string;
}) {
  return (
    <figure className="documentary-image">
      <div className="documentary-image-frame">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          quality={82}
          loading="lazy"
        />
      </div>
      <figcaption>
        <span>{caption}</span>
        <span className="image-credit">
          <a href={image.sourceUrl} target="_blank" rel="noopener noreferrer">
            {image.credit}
          </a>
          {" · "}
          <a href={image.licenseUrl} target="_blank" rel="noopener noreferrer">
            {image.license}
          </a>
          {image.note ? ` · ${image.note}` : ""}
        </span>
      </figcaption>
    </figure>
  );
}
