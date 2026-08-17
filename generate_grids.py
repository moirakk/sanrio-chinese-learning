def print_grid(name, grid_str):
    lines = [l.strip() for l in grid_str.strip().split('\n')]
    print(f"export function {name}Guide({{ className = 'w-24 h-24' }}: IconProps): ReactElement {{")
    print("  const grid = [")
    for i, line in enumerate(lines):
        comma = "," if i < len(lines)-1 else ""
        print(f"    \"{line}\"{comma}")
    print("  ];")

kitty = """
. . . . . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . O O O . . . . . . . . . . O O O . . . . . . .
. . . O O W W W O O . . . . . . O O W W W O O . . . . .
. . O W W W W W W W O . . . . O W W W W W W W O . . . .
. O W W W W W W W W W O O O O W W W W W W W W W O . . .
. O W W W W W W W W W W W W W W W W W W W W W W O . . .
O W W W W W W W W W W W W W W W W W O O O W W W W O . .
O W W W W W W W W W W W W W W W W O R R R O W W W O . .
O W W W W W W W W W W W W W W W O R R L R R O W W O . .
O W W W W W W W W W W W W W W W W O R R R O W W W O . .
O W W W W W W W W W W W W W W W O R R L R R O W W O . .
O W W W O O W W W W W W W W W W W O R R R O W W W O . .
O W W O W W O W W W W W W W W W W W O O O W W W W O . .
O W W O W W O W W W O O O W W W W W W W W W W W W O . .
O W W O O O W W W O Y Y Y O W W W O O O W W W W W O . .
O W W W W W W W W O Y L Y O W W O W W O W W W W W O . .
O W W W W W W W W W O O O W W W O W W O W W W W W O . .
O W W W W W W W W W W W W W W W W O O O W W W W W O . .
. O W W W P P P W W W W W W W P P P W W W W W W O . . .
. O W W P P L P P W W W W W P P L P P W W W W W O . . .
. . O W W P P P W W W W W W W P P P W W W W W O . . . .
. . . O O W W W W W W W W W W W W W W W W O O . . . . .
. . . . . O O O O O O O O O O O O O O O O . . . . . . .
. . . . . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . . . . . . . . . . . . . .
"""

melody = """
. . . . . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . O O O O . . . . . O O O O . . . . . . .
. . . . . . . O M M M M O . . . O M M M M O . . . . . .
. . . . . . O M M M L M M O . O M M M L M M O . . . . .
. . . . . . O M M M M M M O . O M M M M M M O . . . . .
. . . . . O M M M M M M M O . O M M M M M M M O . . . .
. . . . O M M M M M M M M M O M M M M M M M M M O . . .
. . . O M M M M M M M M M M M M M M M M M M M M M O . .
. . O M M M M M M M M M M M M M M M M M M M M M M M O .
. . O M M M M M M M M M M M M M W W O O O W W M M M O .
. O M M M M M M M M M M M M M W Y Y W O O W W M M M O .
. O M M M M O O O O O O O O O W Y L Y W O O W M M M O .
. O M M M O W W W W W W W W W W W Y Y W W W M M M M O .
. O M M O W W W W W W W W W W W W W W W W W W M M M O .
. O M O W W W O O W W W W W W W O O W W W W W W M M O .
. O M O W W O W W O W W W W W O W W O W W W W W M M O .
. O M O W W O W W O W W O O W O W W O W W W W W M M O .
. O M O W W W O O W W O Y Y O W W O O W W W W W M O . .
. O M O W W W W W W W O Y Y O W W W W W W W W W M O . .
. . O M O W W W W W W W O O W W W W W W W W W M O . . .
. . O M M O W W P P P W W W P P P W W W W W O M O . . .
. . . O M M O P P L P P W P P L P P W W W O M O . . . .
. . . . O O M O P P P W W W P P P W W W O M O . . . . .
. . . . . . O O W W W W W W W W W W W O M O . . . . . .
. . . . . . . . O O O O O O O O O O O O O . . . . . . .
. . . . . . . . . . . . . . . . . . . . . . . . . . . .
"""

cinna = """
. . . . . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . . . . O O O O O O . . . . . . . . . . .
. . . . . . . . . O O W W W W W W O O . . . . . . . . .
. . . . . . . . O W W W W W W W W W W O . . . . . . . .
. . . . . . . O W W W W W W W W W W W W O . . . . . . .
. . O O O O O W W W W W W W W W W W W W W O O O O O . .
. O W W W W W W W W W W W W W W W W W W W W W W W W O .
O W W W W W W W W W W W W W W W W W W W W W W W W W W O
O W W W W W W W W W W W W W W W W W W W W W W W W W W O
O W W W W W W W W O O W W W W W W O O W W W W W W W W O
O W W W W W W W O B B O W W W W O B B O W W W W W W W O
O W W W W W W O B B L B O W W O B B L B O W W W W W W O
O W W W W W W W O B B O W W W W O B B O W W W W W W W O
. O W W W W W W W O O W W O O W W O O W W W W W W W O .
. O W W W W P P P W W W O B B O W W W P P P W W W W O .
. . O W W P P L P P W W O B B O W W P P L P P W W O . .
. . O W W W P P P W W W W O O W W W W P P P W W W O . .
. . . O W W W W W W W W W W W W W W W W W W W W O . . .
. . . . O O W W W W W W W W W W W W W W W W O O . . . .
. . . . . . O O O O W W W W W W W W O O O O . . . . . .
. . . . . . . . . . O O O O O O O O . . . . . . . . . .
"""

pom = """
. . . . . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . . . O O O O O . . . . . . . . . . . . .
. . . . . . . . O O B B L B B O O . . . . . . . . . . .
. . . . . . . O B B B B B B B B B O . . . . . . . . . .
. . . . . . . . O O O O O O O O O . . . . . . . . . . .
. . . . . . . O Y Y Y Y Y Y Y Y Y O . . . . . . . . . .
. . . . . . O Y Y Y Y Y Y Y Y Y Y Y O . . . . . . . . .
. . . . . O Y Y Y Y Y Y Y Y Y Y Y Y Y O . . . . . . . .
. . . O O Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y O O . . . . . .
. . O Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y O . . . . .
. O Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y O . . . .
O Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y O . . .
O Y Y Y Y Y O O Y Y Y Y Y Y Y O O Y Y Y Y Y Y Y O . . .
O Y Y Y Y O B B O Y Y Y Y Y O B B O Y Y Y Y Y Y O . . .
O Y Y Y Y O B B O Y Y Y Y Y O B B O Y Y Y Y Y Y O . . .
O Y Y Y Y Y O O Y Y Y O O Y Y O O Y Y Y Y Y Y Y O . . .
O Y Y Y P P P Y Y Y O B B O Y Y Y P P P Y Y Y Y O . . .
O Y Y P P L P P Y Y O B B O Y Y P P L P P Y Y Y O . . .
. O Y Y P P P Y Y Y Y O O Y Y Y Y P P P Y Y Y O . . . .
. . O O Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y O O . . . . .
. . . . O O O O Y Y Y Y Y Y Y Y O O O O O . . . . . . .
. . . . . . . . O O O O O O O O . . . . . . . . . . . .
"""

kuromi = """
. . . . . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . . . . . . . . . . . . . .
. . . O O . . . . . . . . . . . . . . . . O O . . . . .
. . O K K O . . . . . . . . . . . . . . O K K O . . . .
. . O K K O O . . . . . . . . . . . . O O K K O . . . .
. . O K K K K O O O O O O O O O O O O K K K K O . . . .
. . O K K K K K K K K K K K K K K K K K K K K O . . . .
. . . O K K K K K K K K K K K K K K K K K K O . . . . .
. . . . O K K K K P P P P P P K K K K K K O . . . . . .
. . . . . O K K P P W W W W P P K K K K O . . . . . . .
. . . . . O K K P W O W W O W P K K K K O . . . . . . .
. . . . . O K K P W W O O W W P K K K K O . . . . . . .
. . . . O K K K K P P W W P P K K K K K K O . . . . . .
. . . O K K W W W W W W W W W W W W W K K K O . . . . .
. . O K K W W W W W W W W W W W W W W W K K O . . . . .
. O K K W W W O O W W W W W O O W W W W K K O . . . . .
. O K W W W O B B O W W W O B B O W W W W K O . . . . .
. O K W W W O B L O W W W O B L O W W W W K O . . . . .
. O K W W W W O O W W W W W O O W W W W W K O . . . . .
. O K W W W W W W W O O O W W W W W W W W K O . . . . .
. O K W W P P P W W O P O W W P P P W W W K O . . . . .
. . O K W P L P W W W O W W W P L P W W K O . . . . . .
. . . O K W P P W W W W W W W W P P W K O . . . . . . .
. . . . O O W W W W W W W W W W W W O O . . . . . . . .
. . . . . . O O O O O O O O O O O O . . . . . . . . . .
"""

pochacco = """
. . . . . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . . O O O O O O . . . . . . . . . . . . .
. . . . . . . O O W W W W W W O O . . . . . . . . . . .
. . . . . . O W W W W W W W W W W O . . . . . . . . . .
. . O O . O W W W W W W W W W W W W O . O O O O O . . .
. O B B O W W W W W W W W W W W W W W O B B B B B O . .
O B B B B O W W W W W W W W W W W W O B B B B B B O . .
O B B B B B W W W W W W W W W W W W B B B B B B B O . .
O B B B B B W W O O W W W W O O W W B B B B B B B O . .
O B B B B B W O B B O W W O B B O W B B B B B B B O . .
O B B B B B W O B B O W W O B B O W B B B B B B B O . .
. O B B B B W W O O W W W W O O W W B B B B B B O . . .
. . O B B O W W W W W O O W W W W W O B B B B O . . . .
. . . O O W W W W W O B B O W W W W W O B B O . . . . .
. . . . W W W W W W O B B O W W W W W W O O . . . . . .
. . . . W W W P P W W O O W W P P W W W W . . . . . . .
. . . . W W P P L P W W W W P P L P W W W . . . . . . .
. . . . W W W P P W W O O W W P P W W W W . . . . . . .
. . . . . W W W W W W O O W W W W W W W . . . . . . . .
. . . . . . O O O W W W W W W O O O . . . . . . . . . .
. . . . . . . . . O O O O O O . . . . . . . . . . . . .
"""

print_grid('Kitty', kitty)
print_grid('Melody', melody)
print_grid('Cinnamoroll', cinna)
print_grid('Pompompurin', pom)
print_grid('Kuromi', kuromi)
print_grid('Pochacco', pochacco)

