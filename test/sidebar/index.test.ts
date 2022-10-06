interface TOC {
  content: string
  lvl: number
  slug?: string
  children?: TOC[]
}

const isDeeper = (c: TOC, p: TOC) => c.lvl > p.lvl
const toLabel = (c: TOC) => ({ label: c.content, ...c })

const toTree = (flat: TOC[]): TOC[] => {
  if (flat.length <= 1) return flat
  let start = flat[0]
  const res: any[] = []
  for (let i = 1; i < flat.length; i++) {
    const now = flat[i]
    if (isDeeper(now, start)) {
      if (!start.children) {
        start.children = []
      }
      start.children?.push(toLabel(now))
    } else {
      res.push(toLabel(start))
      start = now
    }
    if (i === flat.length - 1) {
      res.push(toLabel(start))
    }
  }

  res.forEach((toc) => {
    toc.children && toc.children.length > 1
      ? (toc.children = toTree(toc.children))
      : {
          /**no do */
        }
  })
  return res
}

describe('toTree', () => {
  it.skip('step1', () => {
    const input: TOC[] = [
      { content: 'h2', lvl: 2 },
      { content: 'h1', lvl: 1 },
      { content: 'h2', lvl: 2 },
      { content: 'h3', lvl: 3 },
      { content: 'h3', lvl: 3 },
      { content: 'h4', lvl: 4 },
      { content: 'h2', lvl: 2 },
      { content: 'h2', lvl: 2 }
    ]

    const step1 = [
      { content: 'h2', lvl: 2 },
      {
        content: 'h1',
        lvl: 1,
        children: [
          { content: 'h2', lvl: 2 },
          { content: 'h3', lvl: 3 },
          { content: 'h3', lvl: 3 },
          { content: 'h4', lvl: 4 },
          { content: 'h2', lvl: 2 },
          { content: 'h2', lvl: 2 }
        ]
      }
    ]

    const res = toTree(input)
    expect(res).toEqual(step1)
  })

  it('toTree3', () => {
    const input: TOC[] = [
      { content: 'h2', lvl: 2 },
      { content: 'h1', lvl: 1 },
      { content: 'h2', lvl: 2 },
      { content: 'h3', lvl: 3 },
      { content: 'h3', lvl: 3 },
      { content: 'h4', lvl: 4 },
      { content: 'h2', lvl: 2 },
      { content: 'h2', lvl: 2 },
      { content: 'h6', lvl: 6 }
    ]

    const output = toTree(input)

    expect(output).toEqual([
      {
        label: 'h2',
        lvl: 2
      },
      {
        label: 'h1',
        lvl: 1,
        children: [
          {
            label: 'h2',
            lvl: 2,
            children: [
              { label: 'h3', lvl: 3 },
              {
                label: 'h3',
                lvl: 3,
                /**c**/ children: [{ label: 'h4', lvl: 4 }]
              }
            ]
          },
          { label: 'h2', lvl: 2 },
          { label: 'h2', lvl: 2, children: [{ content: 'h6', lvl: 6 }] }
        ]
      }
    ])
    const tree = output.map((v) => ({ label: v.content, children: v.children }))
    console.log(tree)
  })
})
