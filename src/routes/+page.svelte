<script>
    import { chatCompletion, imageGeneration } from "$lib/openai";
    let recepie = "";
    let input = "";
    let loadingDots = ".";
    let frames = 0;
    let imageUrl = "";

    const getRecepie = async () => {
        recepie = "generating";
        startLoadingDots();
        generateImage();
        const data = await chatCompletion(
            "Lag en oppskrift med disse ingrediensene " +
                input +
                ", og gi meg oppskriften i HTML-kode"
        );
        recepie = data.choices[0].message.content;
        console.log(recepie);
    };

    const generateImage = async () => {
        imageUrl = "generating";
        const data = await imageGeneration("En matrett bestående av " + input);
        imageUrl = data["data"][0]["url"];
    };

    const startLoadingDots = () => {
        if (frames % 30 == 0) {
            if (loadingDots.length < 3) {
                loadingDots += ".";
            } else {
                loadingDots = "";
            }
        }
        if (recepie === "generating" || imageUrl === "generating") {
            frames += 1;
            requestAnimationFrame(startLoadingDots);
        }
    };
</script>

<header>
    <h1>Thor og Martins oppskriftsgenerator</h1>
</header>

<main>
    <form on:submit|preventDefault={getRecepie}>
        <input type="text" placeholder="dine ingredienser" bind:value={input} />
        <button type="submit">Generer oppskrift</button>
    </form>

    {#if recepie === "generating" || imageUrl === "generating"}
        <div class="loading">
            <img src="/loading.gif" alt="Genererer oppskrift" />
            <h2>
                Genererer oppskrift<span id="loadingDots">{loadingDots}</span>
            </h2>
        </div>
    {:else if recepie !== ""}
        {#if recepie.includes("dessverre") || recepie.includes("beklager")}
            <div>
                <p>
                    Beklager, jeg klarer ikke lage en oppskrift med de
                    ingrediensene. Prøv noe annet.
                </p>
            </div>
        {:else}
            <div>
                <img src={imageUrl} alt="Et bilde av en oppskrift" />
                {@html recepie}
            </div>
        {/if}
    {:else}
        <div class="warning">
            <h2>Advarsel: Denne generatoren bruker kunstig intelligens.</h2>
            <p>
                Oppskriftene som generes er generatorens egne. Thor og Martin
                tar personlig avstand fra alle oppskrifter generatoren
                genererer.
            </p>
        </div>
    {/if}
</main>

<style>
    header {
        text-align: center;
    }
    main {
        max-width: 900px;
        margin: auto;
    }
    form {
        text-align: center;
    }
    .loading {
        text-align: center;
    }
    #loadingDots {
        display: inline-block;
        width: 12px;
        text-align: left;
    }
    img {
        display: block;
        margin: auto;
        max-width: 100%;
        margin-top: 20px;
    }
    .warning{
        text-align: center;
    }
</style>
